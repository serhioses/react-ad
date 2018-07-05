import { appAuth, firebase } from '@app-firebase';
import { USER_GET, USER_OUT, SET_REFFERER } from '@app-constants/auth';

export const setRefferer = (location) => {
  return {
    type: SET_REFFERER,
    payload: location,
  };
};

export const startSignIn = (location) => {
  return (dispatch, getState) => {
    dispatch(setRefferer(location));
    return appAuth.signIn();
  };
};

export const continueSignIn = (firebaseUser) => {
  return (dispatch, getState) => {
    return firebase.firebaseRef.child(`users/${firebaseUser.uid}`).once('value', (snapshot) => {
      let user = snapshot.val();

      if (!user) {
        user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        };

        firebase.firebaseRef.child(`users/${user.uid}`).set(user);
      }

      dispatch(signIn(user));
    });
  }
};

export const signIn = (user) => {
  return {
    type: USER_GET,
    payload: user,
  };
}

export const startSignOut = () => {
  return (dispatch, getState) => {
    return appAuth.signOut();
  };
};

export const signOut = () => {
  return {
    type: USER_OUT,
  };
};

export const startAuthStateChange = () => {
  return (dispatch, getState) => {
    return appAuth.authStateChange((user) => {
      if (user) {
        dispatch(continueSignIn(user));
      } else {
        dispatch(signOut());
      }
    });
  };
};
