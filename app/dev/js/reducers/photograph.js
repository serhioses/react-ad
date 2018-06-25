import { PHOTOGRAPH_CREATE, PHOTOGRAPHS_GET } from '@app-constants/photograph';

export const photographReducer = (state = [], action) => {
  switch (action.type) {
    case PHOTOGRAPHS_GET: {
      return action.payload;
    }
    case PHOTOGRAPH_CREATE: {
      return [
        ...state,
        action.payload,
      ];
    }
  }

  return state;
};
