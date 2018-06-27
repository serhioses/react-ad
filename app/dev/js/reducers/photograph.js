import {
  PHOTOGRAPH_CREATE,
  PHOTOGRAPHS_GET,
  PHOTOGRAPH_GET,
  PHOTOGRAPH_CLEAR,
  PHOTOGRAPH_UPDATE,
  PHOTOGRAPH_REMOVE
} from '@app-constants/photograph';

export const photographsReducer = (state = null, action) => {
  switch (action.type) {
    case PHOTOGRAPHS_GET: {
      return action.payload;
    }
    case PHOTOGRAPH_GET: {
      if (!state) {
        return [{
          ...action.payload
        }];
      }

      return state.map((photograph) => {
        if (photograph.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }

        return {
          ...photograph,
        }
      });
    }
    case PHOTOGRAPH_CREATE: {
      if (state) {
        return [
          ...state,
          action.payload,
        ];
      }
      
      return [{
        ...action.payload
      }];
    }
    case PHOTOGRAPH_UPDATE: {
      return state.map((photograph) => {
        if (photograph.id === action.payload.id) {
          return {
            ...photograph,
            ...action.payload.updates,
          };
        }

        return {
          ...photograph,
        };
      });
    }
    case PHOTOGRAPH_REMOVE: {
      return state.filter((photograph) => photograph.id !== action.payload);
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
    case PHOTOGRAPH_REMOVE: {
      return null;
    }
  }

  return state;
};
