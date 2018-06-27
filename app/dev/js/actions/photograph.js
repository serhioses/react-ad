import { firebase } from '@app-firebase';

import history from '@app-history';
import {
  PHOTOGRAPH_CREATE,
  PHOTOGRAPHS_GET,
  PHOTOGRAPH_GET,
  PHOTOGRAPH_CLEAR,
  PHOTOGRAPH_UPDATE,
  PHOTOGRAPH_REMOVE
} from '@app-constants/photograph';
import { PHOTOGRAPH_EDIT, PHOTOGRAPH_CREATE as PHOTOGRAPH_CREATE_ROUTE } from '@app-constants/routes';
import { getPhotograph as getPhotographSelector } from '@app-selectors/photograph';
import { getProfile } from '@app-selectors/auth';

export const startPublishPhotograph = (data) => {
  return async (dispatch, getState) => {
    let storageRef = firebase.storageRef;
    let userId = getState().profile.uid;

    let snapshot1 = await storageRef.child(`${userId}/images/${data.file.name}`).put(data.file);

    let snapshot2 = await storageRef.child(`${userId}/thumbs/${data.file.name}`).putString(data.thumb, 'data_url');

    let ph = {
      userId,
      original: snapshot1.downloadURL,
      thumb: snapshot2.downloadURL,
      fileName: data.file.name,
      name: data.name,
      desc: data.desc,
      createdAt: Date.now(),
    };

    let phRef = await firebase.firebaseRef.child(`photographs`).push(ph);

    let fullPhotograph = {
      ...ph,
      id: phRef.key,
    };

    // if (data.isUpdate) {
    //   dispatch(updatePhotograph(fullPhotograph));
    //   dispatch(startDeletePhotographFile(data.fileToRemove));
    // } else {
      
    // }
    dispatch(createPhotograph(fullPhotograph));
    // dispatch(getPhotograph(fullPhotograph));

    history.push(`${PHOTOGRAPH_EDIT}/${phRef.key}`);
  };
};

export const startUpdatePhotograph = (data) => {
  return async (dispatch, getState) => {
    const state = getState();
    const profile = getProfile(state);
    const currentPhotograph = getPhotographSelector(state);
    const photographRef = firebase.firebaseRef.child(`photographs/${data.id}`);
    const storageRef = firebase.storageRef;
    let updates;

    if (data.fileToRemove) {
      await firebase.storageRef.child(`${profile.uid}/images/${data.fileToRemove}`).delete();
      await firebase.storageRef.child(`${profile.uid}/thumbs/${data.fileToRemove}`).delete();

      const originalSnapshot = await storageRef.child(`${profile.uid}/images/${data.file.name}`).put(data.file);

      const thumbSnapshot = await storageRef.child(`${profile.uid}/thumbs/${data.file.name}`).putString(data.thumb, 'data_url');

      updates = {
        name: data.name,
        desc: data.desc,
        original: originalSnapshot.downloadURL,
        thumb: thumbSnapshot.downloadURL,
        fileName: data.file.name,
      };
    } else {
      updates = {
        name: data.name,
        desc: data.desc,
      };
    }

    await photographRef.update(updates);

    dispatch(updatePhotograph(updates, data.id));
    dispatch(getPhotograph({
      ...currentPhotograph,
      ...updates,
    }));
  };
};

export const createPhotograph = (ph) => {
  return {
    type: PHOTOGRAPH_CREATE,
    payload: ph,
  };
};

export const updatePhotograph = (updates, id) => {
  return {
    type: PHOTOGRAPH_UPDATE,
    payload: {
      updates,
      id,
    },
  };
};

export const startDeletePhotographFile = (name) => {
  return async (dispatch, getState) => {
    const state = getState();
    const currentPhotograph = getPhotographSelector(state);

    await firebase.storageRef.child(`${state.profile.uid}/images/${name}`).delete();
    await firebase.storageRef.child(`${state.profile.uid}/thumbs/${name}`).delete();

    // dispatch(getPhotograph({
    //   ...currentPhotograph,
    //   fileName: null,
    //   original: null,
    //   thumb: null
    // }));
  };
};

export const startGetPhotograph = (id) => {
  return (dispatch, getState) => {
    firebase.firebaseRef.child(`photographs/${id}`).once('value', (snapshot) => {
      const photograph = snapshot.val();

      if (photograph) {
        dispatch(getPhotograph({
          ...photograph,
          id,
        }));
      }
    });
  };
};

export const getPhotograph = (photograph) => {
  return {
    type: PHOTOGRAPH_GET,
    payload: photograph,
  };
};

export const clearCurrentPhotograph = () => {
  return {
    type: PHOTOGRAPH_CLEAR,
    payload: null,
  };
};

export const startGetPhotographs = () => {
  return (dispatch, getState) => {
    firebase.firebaseRef.child('photographs').once('value', (snapshot) => {
      const items = snapshot.val();

      if (items) {
        const photographs = Object.keys(items).map((key) => {
          return {
            ...items[key],
            id: key,
          };
        });

        dispatch(getPhotographs(photographs));
      }
    });
  };
};

const getPhotographs = (photographs) => {
  return {
    type: PHOTOGRAPHS_GET,
    payload: photographs,
  }
};

export const startRemovePhotograph = (id, fileName) => {
  return async (dispatch, getState) => {
    const profile = getProfile(getState());

    await firebase.firebaseRef.child(`photographs/${id}`).remove();

    await firebase.storageRef.child(`${profile.uid}/images/${fileName}`).delete();
    await firebase.storageRef.child(`${profile.uid}/thumbs/${fileName}`).delete();

    dispatch(removePhotograph(id));

    history.replace(`${PHOTOGRAPH_CREATE_ROUTE}`);
  };
};

export const removePhotograph = (id) => {
  return {
    type: PHOTOGRAPH_REMOVE,
    payload: id,
  }
};
