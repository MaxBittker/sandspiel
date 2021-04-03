import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";

import timeago from "timeago.js";

import HyperText from "./hypertext.js";
import SignInScreen from "./signin";
import { functions, storage } from "../api.js";

let n = 0;
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
      <div className="submissions admin">
        {submissions.map((submission) => {
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
                  hash: `#${submission.id}`,
                }}
                onClick={() => {
                  window.UI.setState(
                    () => ({
                      currentSubmission: null,
                    }),
                    window.UI.load
                  );
                }}
              >
                <img src={`${storageUrl}${submission.data.id}.png?alt=media`} />
              </Link>
              <div style={{ width: "50%" }}>
                <h3
                  className="title"
                  style={{ flexGrow: 1, wordWrap: "break-word" }}
                >
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

                <NavLink
                  to={{
                    pathname: "/browse/search/",
                    search: `?user=${submission.data.user_id}`,
                  }}
                >
                  웃
                </NavLink>

                <h4>{displayTime}</h4>
                <h3 style={{ flexGrow: 1 }}>
                  {submission.data.reports} reports
                </h3>
                <div className="adminButtons">
                  <button
                    className="BAN"
                    title="ban"
                    onClick={() => judge(submission.id, 2)}
                  >
                    ban 🤾🏽‍♂️
                  </button>
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

class AdminBrowse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      submissions: null,
      decidedIds: [],
      browseVotes: {},
      search: "",
      currentUser: firebase.auth().currentUser,
    };
  }
  componentWillMount() {
    this.loadSubmissions();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname != this.props.location.pathname) {
      this.loadSubmissions();
    }
  }

  voteFromBrowse(submission) {
    // creations/:id/vote
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        fetch(functions._url(`api/creations/${submission.id}/vote`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.setState(({ browseVotes }) => ({
              browseVotes: { [submission.id]: data.score, ...browseVotes },
            }));
          })
          .catch((e) => {
            console.error(e);
          });
      });
  }
  loadSubmissions() {
    // this.setState({ submissions: null });
    fetch(functions._url("api/reports"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({ submissions: response });
        // this.pause();
      })
      .catch((error) => {
        this.setState({ submissions: false });
        console.error("Error:", error);
      });
  }
  judge(id, ruling) {
    this.setState(({ decidedIds }) => ({
      decidedIds: [...decidedIds, id],
    }));
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        // set the __session cookie
        fetch(
          functions._url(`api/creations/${id}/judge`) + `?ruling=${ruling}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            n++;
            if (n > 20) {
              this.loadSubmissions();
              n = 0;
            }
          })
          .catch((e) => {
            console.error(e);
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
      submissions.filter((submission) => !decidedIds.includes(submission.id));
    return (
      <React.Fragment>
        <SignInScreen />
        <h2 style={{ display: "inline-block" }}>do it for doona </h2>

        {submissions && <h3>{submissions.length} actionable reports:</h3>}
        <NavLink to="/browse/">
          <button>Browse new</button>
        </NavLink>
        <Submissions
          submissions={submissions}
          voteFromBrowse={(submission) => this.voteFromBrowse(submission)}
          browseVotes={browseVotes}
          judge={(id, ruling) => this.judge(id, ruling)}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(AdminBrowse);
