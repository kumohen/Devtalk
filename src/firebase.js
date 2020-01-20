import * as firebase from "firebase";


  var firebaseConfig = {
    apiKey: "AIzaSyDThrSjPVJRkziFDbo_cZXjNIeNjMfQBfo",
    authDomain: "authentication-78f04.firebaseapp.com",
    databaseURL: "https://authentication-78f04.firebaseio.com",
    projectId: "authentication-78f04",
    storageBucket: "authentication-78f04.appspot.com",
    messagingSenderId: "898045315527",
    appId: "1:898045315527:web:c7b4ebdb32181a142d31e2",
    measurementId: "G-XSLJKE0GSK"
  };

  firebase.initializeApp(firebaseConfig);

  export const database = firebase.database().ref("/items");
  export const database2 = firebase.database().ref("/profile");

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
