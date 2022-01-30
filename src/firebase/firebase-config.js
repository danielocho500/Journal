import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDdaqwTmB3l1CFj79xsFzXcSB4WYLsXUQM",
    authDomain: "react-5fea8.firebaseapp.com",
    projectId: "react-5fea8",
    storageBucket: "react-5fea8.appspot.com",
    messagingSenderId: "865171545065",
    appId: "1:865171545065:web:1464df9b271bcc2c214978"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuth = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuth,
      firebase
  }