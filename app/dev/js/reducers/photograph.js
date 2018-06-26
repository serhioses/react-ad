import {
  PHOTOGRAPH_CREATE,
  PHOTOGRAPHS_GET,
  PHOTOGRAPH_GET,
  PHOTOGRAPH_CLEAR,
  PHOTOGRAPH_UPDATE
} from '@app-constants/photograph';

export const photographsReducer = (state = null, action) => {
  switch (action.type) {
    case PHOTOGRAPHS_GET: {
      return action.payload;
    }
    case PHOTOGRAPH_CREATE: {
      if (state) {
        return [
          ...state,
          action.payload,
        ];
      }
      
      return [action.payload];
    }
    case PHOTOGRAPH_UPDATE: {
      return state.map((photograph) => {
        if (photograph.id === action.payload.id) {
          return action.payload;
        }

        return {
          ...photograph,
        };
      });
    }
  }

  return state;
};

export const photographReducer = (state = null, action) => {
  switch(action.type) {
    case PHOTOGRAPH_GET:
    case PHOTOGRAPH_CLEAR: {
      return action.payload;
    }
  }

  return state;
};
