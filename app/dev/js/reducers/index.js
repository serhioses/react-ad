import { USER_GET, USER_OUT, SET_REFFERER, LOADING_STATE_SET, PHOTOGRAPH_CREATE } from '@app-constants';
import { HOME } from '@app-constants/routes';

export const userReducer = (state = 'pending', action) => {
  switch (action.type) {
    case USER_GET: {
      return action.payload;
    }
    case USER_OUT: {
      return null;
    }
  }

  return state;
}

export const reffererReducer = (state = HOME, action) => {
  switch (action.type) {
    case SET_REFFERER: {
      return action.payload;
    }
  }

  return state;
};

export const loadingStateReducer = (state = 'loaded', action) => {
  switch (action.type) {
    case LOADING_STATE_SET: {
      return action.payload;
    }
  }

  return state;
};

export const photographReducer = (state = [], action) => {
  switch (action.type) {
    case PHOTOGRAPH_CREATE: {
      return [
        ...state,
        action.payload,
      ];
    }
  }

  return state;
};
