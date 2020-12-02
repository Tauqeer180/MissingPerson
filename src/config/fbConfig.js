import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAYe85NRoVG85rX7qFQxo1ozVDpefQD7mk",
    authDomain: "missing-person-dc23a.firebaseapp.com",
    databaseURL: "https://missing-person-dc23a.firebaseio.com",
    projectId: "missing-person-dc23a",
    storageBucket: "missing-person-dc23a.appspot.com",
    messagingSenderId: "14942880093",
    appId: "1:14942880093:web:bc403194121c182f27e8b4",
    measurementId: "G-L44DFQWB5G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
  firebase.firestore().settings({timestampsInSnapshots: true}); 
  export default firebase;