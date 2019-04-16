import React from "react";
import { functions, storage } from "../api.js";
import { NavLink, Link, withRouter } from "react-router-dom";

let storageUrl =
  "https://firebasestorage.googleapis.com/v0/b/sandtable-8d0f7.appspot.com/o/creations%2F";

class Submissions extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.submissions !== this.props.submissions;
  }
  render() {
    let { submissions, voteFromBrowse, browseVotes } = this.props;

    if (!submissions) {
      return <div style={{ height: "90vh" }}>Loading Submissions...</div>;
    }
    if (submissions.length == 0) {
      return <div style={{ height: "90vh" }}>Didn't find anything!</div>;
    }
    return (
      <div className="submissions">
        {submissions.map(submission => {
          return (
            <div key={submission.id} className="submission">
              <img src={`${storageUrl}${submission.data.id}.png?alt=media`} />
              <div style={{ width: "50%" }}>
                <h3 style={{ flexGrow: 1, wordWrap: "break-word" }}>
                  {submission.data.title}
                </h3>
                <h3 onClick={() => voteFromBrowse(submission)}>
                  <larger>♡</larger>
                  {browseVotes[submission.id] || submission.data.score}
                </h3>
                <h4>
                  {new Date(submission.data.timestamp).toLocaleDateString()}
                </h4>
                <Link
                  to={{
                    pathname: "/",
                    hash: `#${submission.id}`
                  }}
                  onClick={() => {
                    window.UI.setState(
                      () => ({
                        currentSubmission: null
                      }),
                      window.UI.load
                    );
                  }}
                >
                  <button className="load">Load</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      submitting: false,
      dataURL: {},
      submissions: null,
      browseVotes: {}
    };
  }
  componentWillMount() {
    console.log("mounted");
    this.loadSubmissions();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.location.pathname != this.props.location.pathname ||
      prevProps.location.search != this.props.location.search
    ) {
      this.loadSubmissions();
    }
  }
  togglePause() {
    window.paused = !this.state.paused;
    this.setState({ paused: !this.state.paused });
  }

  setSize(event, size) {
    event.preventDefault();
    this.setState({
      size
    });
  }

  loadSubmissions() {
    let { location } = this.props;
    let param = "";
    if (location.pathname.startsWith("/browse/top/")) {
      param = "?q=score";
    }
    if (location.pathname.startsWith("/browse/top-recent/")) {
      param = "?q=toprecent";
    }
    if (location.pathname.startsWith("/browse/search/")) {
      param = location.search;
    }

    console.log("fetching some data");
    this.setState({ submissions: null });
    fetch(functions._url("api/creations") + param, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ submissions: response });
        // this.pause();
      })
      .catch(error => {
        this.setState({ submissions: false });
        console.error("Error:", error);
      });
  }

  voteFromBrowse(submission) {
    // creations/:id/vote
    fetch(functions._url(`api/creations/${submission.id}/vote`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState(({ browseVotes }) => ({
          browseVotes: { [submission.id]: data.score, ...browseVotes }
        }));
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { search, submissions, browseVotes } = this.state;
    return (
      <React.Fragment>
        <NavLink exact to="/browse/">
          <button>New</button>
        </NavLink>
        <NavLink to="/browse/top-recent/">
          <button>Top Recent</button>
        </NavLink>
        <NavLink to="/browse/top/">
          <button>Top All Time</button>
        </NavLink>
        <span style={{ display: "inline-block" }}>
          <input
            onChange={e => this.setState({ search: e.target.value })}
            onKeyDown={e =>
              e.keyCode == 13 &&
              this.props.history.push(`/browse/search/?title=${search}`)
            }
            placeholder="search"
          />
          {search && (
            <NavLink
              to={{
                pathname: "/browse/search/",
                search: `?title=${search}`
              }}
            >
              <button>Search</button>
            </NavLink>
          )}
        </span>

        <Submissions
          submissions={submissions}
          voteFromBrowse={submission => this.voteFromBrowse(submission)}
          browseVotes={browseVotes}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Browse);
