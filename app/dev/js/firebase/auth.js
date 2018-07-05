import { auth, provider } from '@app-firebase/firebase';

export const signIn = () => {
  return auth.signInWithPopup(provider).then((result) => {
    return result;
  });
};

export const signOut = (cb) => {
  return auth.signOut().catch((error) => {
    console.log(error);
  });
};

export const authStateChange = (cb) => {
  return auth.onAuthStateChanged((user) => {
    cb && cb(user);
    return user;
  });
};
