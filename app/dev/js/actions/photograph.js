import { firebase } from '@app-firebase';

import { PHOTOGRAPH_CREATE, PHOTOGRAPHS_GET } from '@app-constants/photograph';

export const startPublishPhotograph = (data) => {
  return async (dispatch, getState) => {
    let storageRef = firebase.storage.ref();
    let userId = getState().profile.uid;

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
  };
};

export const createPhotograph = (ph) => {
  return {
    type: PHOTOGRAPH_CREATE,
    payload: ph,
  }
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
