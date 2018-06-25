import { LOADING_STATE_SET } from '@app-constants';

export const setLoadingState = (state) => {
  return {
    type: LOADING_STATE_SET,
    payload: state,
  };
}
