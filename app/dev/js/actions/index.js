import { auth, firebase } from '@app-firebase';
import { USER_GET, USER_OUT, SET_REFFERER, LOADING_STATE_SET, PHOTOGRAPH_CREATE } from '@app-constants';

export const setRefferer = (location) => {
  return {
    type: SET_REFFERER,
    payload: location,
  };
};

export const startSignIn = (location) => {
  return (dispatch, getState) => {
    dispatch(setRefferer(location));
    return auth.signIn();
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
    return auth.signOut();
  };
};

export const setLoadingState = (state) => {
  return {
    type: LOADING_STATE_SET,
    payload: state,
  };
}

export const signOut = () => {
  return {
    type: USER_OUT,
  };
};

export const startAuthStateChange = () => {
  return (dispatch, getState) => {
    return auth.authStateChange((user) => {
      if (user) {
        // dispatch(setLoadingState('auth'));
        dispatch(continueSignIn(user));
      } else {
        dispatch(signOut());
        // dispatch(setLoadingState('loaded'));
      }
    });
  };
};

// Photograph
export const startPublishPhotograph = (data) => {
  return async (dispatch, getState) => {
    let storageRef = firebase.storage.ref();
    let userId = getState().profile.uid;

    // let promise1 = storageRef.child(`${userId}/images/${data.file.name}`).put(data.file).then((snapshot) => {
    //   return snapshot.downloadURL;
    // });
    // let promise1 = storageRef.child(`${userId}/images/${data.file.name}`).put(data.file);

    let snapshot1 = await storageRef.child(`${userId}/images/${data.file.name}`).put(data.file);

    let snapshot2 = await storageRef.child(`${userId}/thumbs/${data.file.name}`).putString(data.thumb, 'data_url');

    let ph = {
      userId,
      original: snapshot1.downloadURL,
      thumb: snapshot2.downloadURL,
      name: data.name,
      desc: data.desc,
      createdAt: new Date(),
    };

    let phRef = await firebase.firebaseRef.child(`photographs`).push(ph);

    dispatch(createPhotograph({
      ...ph,
      id: phRef.key,
    }));

    // let promise2 = storageRef.child(`${userId}/thumbs/${data.file.name}`).putString(data.thumb, 'data_url').then((snapshot) => {
    //   return snapshot.downloadURL;
    // });

    // Promise.all([promise1, promise2]).then((response) => {
    //   console.log(response);
    //   // let ph = {
    //   //   userId,
    //   //   original: response[0],
    //   //   thumb: response[1],
    //   //   name: 'name',
    //   //   desc: 'desc',
    //   //   createdAt: new Date(),
    //   //   id: '...?',
    //   // };
    // });
  };
};

export const createPhotograph = (ph) => {
  return {
    type: PHOTOGRAPH_CREATE,
    payload: ph,
  }
};
