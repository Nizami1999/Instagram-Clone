import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBM1n6G4b9npikhnn52z9RcRs-IMBhKgu4",
  authDomain: "instagram-clone-745dd.firebaseapp.com",
  projectId: "instagram-clone-745dd",
  storageBucket: "instagram-clone-745dd.appspot.com",
  messagingSenderId: "546829214015",
  appId: "1:546829214015:web:0259612f8e0e5d151d738a",
  measurementId: "G-FM9ERF6HFL",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
