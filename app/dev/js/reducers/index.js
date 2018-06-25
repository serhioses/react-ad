import { LOADING_STATE_SET } from '@app-constants';

export const loadingStateReducer = (state = 'loaded', action) => {
  switch (action.type) {
    case LOADING_STATE_SET: {
      return action.payload;
    }
  }

  return state;
};
