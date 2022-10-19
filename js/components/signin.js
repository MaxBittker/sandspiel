import React from "react";
import { NavLink } from "react-router-dom";

import FirebaseAuth from "react-firebaseui/FirebaseAuth";

class SignInScreen extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
    expanded: true,
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "redirect",
    signInOptions: [
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // {
      //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //   requireDisplayName: false,
      // },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        emailLinkSignIn: function () {
          return {
            // Additional state showPromo=1234 can be retrieved from URL on
            // sign-in completion in signInSuccess callback by checking
            // window.location.href.
            url: "https://sandspiel.club/browse",
            // Custom FDL domain.
            // Always true for email link sign-in.
            handleCodeInApp: true,
          };
        },
      },
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.setState({ isSignedIn: !!firebase.auth().currentUser });

    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      if (!this.state.expanded) {
        return (
          <span>
            <p>
              Please{" "}
              <button onClick={() => this.setState({ expanded: true })}>
                Sign in
              </button>{" "}
              to vote!{" "}
            </p>
            <span style={{ display: "none" }}>
              {/* gross hack for completing login */}
              <FirebaseAuth
                uiConfig={this.uiConfig}
                FirebaseAuth={firebase.auth()}
              />
            </span>
          </span>
        );
      } else {
        return (
          <>
            Sign-in to post and to vote!
            <FirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </>
        );
      }
    }
    let { currentUser } = firebase.auth();
    // console.log(currentUser);
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NavLink
            style={{ flexGrow: 0, margin: "0 4px", fontSize: "19px" }}
            to={{
              pathname: "/browse/search/",
              search: `?user=${currentUser.uid}`,
            }}
          >
            [Post History]
          </NavLink>
          {!currentUser.emailVerified &&
            `Please Verify your email ${currentUser.email} to vote!`}
          <button
            style={{ flexGrow: 0, margin: "0 10px" }}
            onClick={() => {
              if (window.confirm("Sign out?")) {
                firebase.auth().signOut();
              }
            }}
          >
            Sign-out
          </button>
        </div>
      </div>
    );
  }
}

export default SignInScreen;
