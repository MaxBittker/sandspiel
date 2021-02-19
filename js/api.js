// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

window.firebase = firebase;

firebase.initializeApp({
  apiKey: "AIzaSyD2APPEyxCi9vB2olvUgzSsbgH1Pyz-as0",
  storageBucket: "sandtable-8d0f7.appspot.com",
  authDomain: "sandspiel.club",
  projectId: "sandtable-8d0f7",
  appId: "1:239719651525:web:80d3674408670521",
  messagingSenderId: "239719651525",
});

const storage = firebase.storage();
const functions = firebase.functions();

// functions.useEmulator("localhost", 5001);

export { functions, storage };
