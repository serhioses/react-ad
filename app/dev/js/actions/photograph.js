import { firebase } from '@app-firebase';

import history from '@app-history';
import {
  PHOTOGRAPH_CREATE,
  PHOTOGRAPHS_GET,
  PHOTOGRAPH_GET,
  PHOTOGRAPH_CLEAR,
  PHOTOGRAPH_UPDATE
} from '@app-constants/photograph';
import { PHOTOGRAPH_EDIT } from '@app-constants/routes';
import { getPhotograph as getPhotographSelector } from '@app-selectors/photograph';

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
      createdAt: new Date(),
    };

    let phRef = await firebase.firebaseRef.child(`photographs`).push(ph);

    let fullPhotograph = {
      ...ph,
      id: phRef.key,
    };

    if (data.isUpdate) {
      dispatch(updatePhotograph(fullPhotograph));
      dispatch(startDeletePhotographFile(data.fileToRemove));
    } else {
      dispatch(createPhotograph(fullPhotograph));
    }
    // dispatch(getPhotograph(fullPhotograph));

    history.push(`${PHOTOGRAPH_EDIT}/${phRef.key}`);
  };
};

export const createPhotograph = (ph) => {
  return {
    type: PHOTOGRAPH_CREATE,
    payload: ph,
  };
};

export const updatePhotograph = (ph) => {
  return {
    type: PHOTOGRAPH_UPDATE,
    payload: ph,
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
        dispatch(getPhotograph(photograph));
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
