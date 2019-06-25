import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";

import timeago from "timeago.js";

import HyperText from "./hypertext.js";
import { functions, storage } from "../api.js";
import SignInScreen from "./signin.js";

const ago = timeago();

let storageUrl =
  "https://firebasestorage.googleapis.com/v0/b/sandtable-8d0f7.appspot.com/o/creations%2F";

class Submissions extends React.Component {
  shouldComponentUpdate(nextProps) {
    let { submissions, browseVotes } = this.props;
    return (
      nextProps.submissions !== submissions ||
      Object.keys(nextProps.browseVotes).length !==
        Object.keys(browseVotes).length
    );
  }
  render() {
    let { submissions, voteFromBrowse, browseVotes, report } = this.props;

    if (!submissions) {
      return <div style={{ height: "90vh" }}>Loading Submissions...</div>;
    }
    if (submissions.length == 0) {
      return <div style={{ height: "90vh" }}>Didn't find anything!</div>;
    }

    return (
      <div className="submissions">
        {submissions.map(submission => {
          let displayTime = new Date(
            submission.data.timestamp
          ).toLocaleDateString();
          let msAgo =
            new Date().getTime() -
            new Date(submission.data.timestamp).getTime();

          if (msAgo < 24 * 60 * 60 * 1000) {
            displayTime = ago.format(submission.data.timestamp);
          }
          return (
            <div key={submission.id} className="submission">
              <Link
                className="img-link"
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
                <img src={`${storageUrl}${submission.data.id}.png?alt=media`} />
              </Link>
              <div style={{ width: "50%" }}>
                <h3 style={{ flexGrow: 1, wordWrap: "break-word" }}>
                  <HyperText text={submission.data.title} />
                </h3>
                <button
                  className="heart"
                  onClick={() => voteFromBrowse(submission)}
                >
                  {browseVotes[submission.id] ? "🖤" : "♡"}
                  {browseVotes[submission.id] || submission.data.score}
                </button>

                <h4>{displayTime}</h4>

                <button
                  className="report"
                  title="report"
                  onClick={() => report(submission.id)}
                >
                  !
                </button>
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
      browseVotes: {},
      search: ""
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
    if (location.search.startsWith("?title=")) {
      // to load deep urls with a search query.
      this.setState({ search: this.props.location.search.slice(7) });
    }
    let param = "";

    if (location.pathname.startsWith("/browse/top/")) {
      param = "?q=score";
    }
    if (location.pathname.startsWith("/browse/top/day")) {
      param = "?q=score&d=1";
    }
    if (location.pathname.startsWith("/browse/top/week")) {
      param = "?q=score&d=7";
    }
    if (location.pathname.startsWith("/browse/top/month")) {
      param = "?q=score&d=30";
    }
    if (location.pathname.startsWith("/browse/search/")) {
      param = location.search;
    }

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
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(token => {
        fetch(functions._url(`api/creations/${submission.id}/vote`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
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
      });
  }
  report(id) {
    fetch(functions._url(`api/creations/${id}/report`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        // this.setState(({ browseVotes }) => ({
        //   browseVotes: { [submission.id]: data.score, ...browseVotes }
        // }));
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { search, submissions, browseVotes } = this.state;
    return (
      <React.Fragment>
        <SignInScreen />
        <NavLink exact to="/browse/">
          <button>New</button>
        </NavLink>
        <NavLink to="/browse/top/day/">
          <button>Day</button>
        </NavLink>
        <NavLink to="/browse/top/week/">
          <button>Week</button>
        </NavLink>
        <NavLink to="/browse/top/month/">
          <button>Month</button>
        </NavLink>
        <NavLink exact to="/browse/top/">
          <button>All </button>
        </NavLink>
        <span style={{ display: "inline-block" }}>
          <input
            value={search}
            onChange={e => this.setState({ search: e.target.value })}
            onKeyDown={e =>
              e.keyCode == 13 && // I think that's enter
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
          report={id => this.report(id)}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Browse);
