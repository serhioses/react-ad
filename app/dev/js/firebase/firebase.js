import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyAhbC5Cmmrrz5WXPfD7KW17R7JH54Wu0C0",
  authDomain: "react-ad.firebaseapp.com",
  databaseURL: "https://react-ad.firebaseio.com",
  projectId: "react-ad",
  storageBucket: "react-ad.appspot.com",
  messagingSenderId: "26139567369"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firebaseRef = firebase.database().ref();

const provider = new firebase.auth.GithubAuthProvider();
const auth = firebase.auth();
const storage = firebase.storage();
const storageRef = storage.ref();

export {
  auth,
  provider,
  firebaseRef,
  storage,
  storageRef,
};
