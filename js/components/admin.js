import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";

import timeago from "timeago.js";

import HyperText from "./hypertext.js";
import { functions, storage } from "../api.js";

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
    let { submissions, voteFromBrowse, browseVotes, judge } = this.props;

    if (!submissions) {
      return <div style={{ height: "90vh" }}>Loading Submissions...</div>;
    }
    if (submissions.length == 0) {
      return (
        <div style={{ height: "90vh" }}>No actionable reports! Thanks ♡♡♡</div>
      );
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
                  <h3>
                    {browseVotes[submission.id] ? "🖤" : "♡"}
                    {browseVotes[submission.id] || submission.data.score}
                  </h3>
                </button>

                <h4>{displayTime}</h4>
                <h3>{submission.data.reports} reports</h3>

                <div className="adminButtons">
                  <button
                    className="delete"
                    title="delete"
                    onClick={() => judge(submission.id, true)}
                  >
                    delete 💥
                  </button>
                  <button
                    className="pardon"
                    title="pardon"
                    onClick={() => judge(submission.id, false)}
                  >
                    pardon 🐣
                  </button>
                </div>
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
      submissions: null,
      decidedIds: [],
      browseVotes: {},
      search: "",
      currentUser: firebase.auth().currentUser
    };
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: user });
      }
    });
    console.log("mounted");
    this.loadSubmissions();

    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        this.setState({ currentUser: user });
        console.log(user);
        console.log(token);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorMessage);
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname != this.props.location.pathname) {
      this.loadSubmissions();
    }
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

  loadSubmissions() {
    // this.setState({ submissions: null });
    fetch(functions._url("api/reports"), {
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
  judge(id, ruling) {
    this.setState(({ decidedIds }) => ({
      decidedIds: [...decidedIds, id]
    }));
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(token => {
        // set the __session cookie
        fetch(
          functions._url(`api/creations/${id}/judge`) + `?ruling=${ruling}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            }
          }
        )
          .then(res => res.json())
          .then(data => {
            this.loadSubmissions();
          })
          .catch(e => {
            console.log(e);
          });
      });
  }
  doSignInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
  render() {
    let { submissions, browseVotes, currentUser, decidedIds } = this.state;

    submissions =
      submissions &&
      submissions.filter(submission => !decidedIds.includes(submission.id));
    return (
      <React.Fragment>
        {currentUser ? (
          <div>
            <img
              style={{ height: "50px", width: "50px", borderRadius: 50 }}
              src={currentUser.photoURL}
            />
            {currentUser.email}
          </div>
        ) : (
          <div>
            <h1>Log in to moderate or the buttons won't work:</h1>
            <button onClick={this.doSignInWithGoogle}>Sign in</button>
          </div>
        )}
        <h2 style={{ display: "inline-block" }}>do it for doona </h2>

        {submissions && <h3>{submissions.length} actionable reports:</h3>}
        <NavLink to="/browse/">
          <button>Browse new</button>
        </NavLink>
        <Submissions
          submissions={submissions}
          voteFromBrowse={submission => this.voteFromBrowse(submission)}
          browseVotes={browseVotes}
          judge={(id, ruling) => this.judge(id, ruling)}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Browse);
