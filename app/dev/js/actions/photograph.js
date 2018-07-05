import { firebase } from '@app-firebase';

import history from '@app-history';
import {
  PHOTOGRAPH_CREATE,
  PHOTOGRAPHS_GET,
  PHOTOGRAPH_GET,
  PHOTOGRAPH_CLEAR,
  PHOTOGRAPH_UPDATE,
  PHOTOGRAPH_REMOVE,
  PHOTOGRAPH_FAIL,
  PHOTOGRAPHS_FAIL
} from '@app-constants/photograph';
import { PHOTOGRAPH_EDIT, PHOTOGRAPH_CREATE as PHOTOGRAPH_CREATE_ROUTE } from '@app-constants/routes';
import { getPhotograph as getPhotographSelector } from '@app-selectors/photograph';
import { getProfile } from '@app-selectors/auth';

export const startPublishPhotograph = (data) => {
  return async (dispatch, getState) => {
    const storageRef = firebase.storageRef;
    const userId = getState().profile.uid;

    const originalSnapshot = await storageRef.child(`${userId}/images/${data.file.name}`).put(data.file);

    const thumbSnapshot = await storageRef.child(`${userId}/thumbs/${data.file.name}`).putString(data.thumb, 'data_url');

    const ph = {
      userId,
      original: originalSnapshot.downloadURL,
      thumb: thumbSnapshot.downloadURL,
      fileName: data.file.name,
      name: data.name,
      desc: data.desc,
      createdAt: Date.now(),
    };

    const phRef = await firebase.firebaseRef.child(`photographs`).push(ph);

    const fullPhotograph = {
      ...ph,
      id: phRef.key,
    };

    dispatch(createPhotograph(fullPhotograph));
    dispatch(getPhotograph(fullPhotograph));

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

    return Promise.resolve();
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

export const startGetPhotograph = (id) => {
  return (dispatch, getState) => {
    firebase.firebaseRef.child(`photographs/${id}`).once('value', (snapshot) => {
      const photograph = snapshot.val();

      if (photograph) {
        dispatch(getPhotograph({
          ...photograph,
          id,
        }));
      } else {
        dispatch(failLoadPhotograph());
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

export const failLoadPhotograph = () => {
  return {
    type: PHOTOGRAPH_FAIL,
  }
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
      } else {
        dispatch(failLoadPhotographs());
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

export const failLoadPhotographs = () => {
  return {
    type: PHOTOGRAPHS_FAIL,
  };
};

export const startRemovePhotograph = (id, fileName) => {
  return async (dispatch, getState) => {
    const profile = getProfile(getState());

    await firebase.firebaseRef.child(`photographs/${id}`).remove();

    await firebase.storageRef.child(`${profile.uid}/images/${fileName}`).delete();
    await firebase.storageRef.child(`${profile.uid}/thumbs/${fileName}`).delete();

    dispatch(removePhotograph(id));
    dispatch(clearCurrentPhotograph());

    history.replace(`${PHOTOGRAPH_CREATE_ROUTE}`);

    return Promise.resolve();
  };
};

export const removePhotograph = (id) => {
  return {
    type: PHOTOGRAPH_REMOVE,
    payload: id,
  }
};
