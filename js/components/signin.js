import React from "react";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class SignInScreen extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "redirect",
    // We will display Google and email as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      }
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <p>Please sign-in to vote:</p>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
    let { currentUser } = firebase.auth();
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ height: "35px", width: "35px", borderRadius: 50 }}
            src={currentUser.photoURL}
          />
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
        </div>
      </div>
    );
  }
}

export default SignInScreen;
