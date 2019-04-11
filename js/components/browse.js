import React from "react";
import { functions, storage } from "../api.js";
import { NavLink, Link } from "react-router-dom";

let storageUrl =
  "https://firebasestorage.googleapis.com/v0/b/sandtable-8d0f7.appspot.com/o/creations%2F";

const Submissions = ({ submissions, voteFromBrowse, browseVotes }) => {
  if (submissions.length == 0) {
    return <div style={{ height: "90vh" }}>Loading Submissions...</div>;
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
                ♡{browseVotes[submission.id] || submission.data.score}
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
};

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
    if (prevProps.location.pathname != this.props.location.pathname) {
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
    let q = "";
    if (location.pathname.startsWith("/browse/top/")) {
      q = "score";
    }
    if (location.pathname.startsWith("/browse/top-recent/")) {
      q = "toprecent";
    }
    console.log("fetching some data");
    this.setState({ submissions: [] });
    fetch(functions._url("api/creations") + `?q=${q}`, {
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
    return (
      <React.Fragment>
        {this.state.submissions && (
          <React.Fragment>
            <NavLink exact to="/browse/">
              <button>Latest</button>
            </NavLink>
            <NavLink to="/browse/top-recent/">
              <button>Top Recent</button>
            </NavLink>
            <NavLink to="/browse/top/">
              <button>Top All Time</button>
            </NavLink>

            <Submissions
              submissions={this.state.submissions}
              voteFromBrowse={submission => this.voteFromBrowse(submission)}
              browseVotes={this.state.browseVotes}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Browse;
