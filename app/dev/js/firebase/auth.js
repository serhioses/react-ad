import { auth, provider } from '@app-firebase/firebase';

// Sign Up
// export const doCreateUserWithEmailAndPassword = (email, password) => 
//   auth.createUserWithEmailAndPassword(email, password);
export const signIn = (location) => {
  return auth.signInWithPopup(provider).then((result) => {
    // this.isAuthenticated = true;
    // cb && cb(result);
    result.redir = location;
    return result;
  });
};

export const signOut = (cb) => {
  return auth.signOut().then(() => {
    cb && cb();
    console.log('Sign-out successful.');
    // Sign-out successful.
  }).catch((error) => {
    cb && cb(error);
    console.log(error);
    // An error happened.
  });
};

export const authStateChange = (cb) => {
  return auth.onAuthStateChanged((user) => {
    cb && cb(user);
    return user;
  });
};

// Sign In
// export const doSignInWithEmailAndPassword = (email, password) => 
//   auth.signInWithEmailAndPassword(email, password);

// Sign Out
// export const doSignOut = () => 
//   auth.signOut();

// console.log(provider);
// auth.signInWithPopup(provider).then(function(result) {
//   // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   console.log(result);
//   // ...
// }).catch(function(error) {
//   console.log(error);
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });
