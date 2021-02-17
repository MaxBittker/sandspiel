import React from "react";

import FirebaseAuth from "react-firebaseui/FirebaseAuth";

class SignInButton extends React.Component {
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
          <div>
            <p>Sign-in to post!</p>
            <FirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        );
      }
    }
    let { currentUser } = firebase.auth();

    return <>{this.props.children}</>;
  }
}

export default SignInButton;
