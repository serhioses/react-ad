import { USER_GET, USER_OUT, SET_REFFERER } from '@app-constants/auth';
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
