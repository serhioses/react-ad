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

export const photographsReducer = (state = { photographs: [], loaded: false }, action) => {
  switch (action.type) {
    case PHOTOGRAPHS_GET: {
      // return action.payload;
      return {
        photographs: [...action.payload],
        loaded: true,
      };
    }
    // case PHOTOGRAPH_GET: {
    //   // if (!state) {
    //   //   return [{
    //   //     ...action.payload
    //   //   }];
    //   // }

    //   return {
    //     ...state,
    //     photographs: state.photographs.map((photograph) => {
    //       if (photograph.id === action.payload.id) {
    //         return {
    //           ...action.payload,
    //         };
    //       }

    //       return {
    //         ...photograph,
    //       }
    //     }),
    //   };
    // }
    case PHOTOGRAPH_CREATE: {
      // if (state) {
      //   return [
      //     ...state,
      //     action.payload,
      //   ];
      // }
      
      // return [{
      //   ...action.payload
      // }];
      return {
        ...state,
        photographs: [...state.photographs, {...action.payload}],
      }
    }
    case PHOTOGRAPH_UPDATE: {
      return {
        ...state,
        photographs: state.photographs.map((photograph) => {
          if (photograph.id === action.payload.id) {
            return {
              ...photograph,
              ...action.payload.updates,
            };
          }

          return {
            ...photograph,
          };
        })
      };
    }
    case PHOTOGRAPH_REMOVE: {
      return {
        ...state,
        photographs: state.photographs.filter((photograph) => photograph.id !== action.payload)
      };
    }
    case PHOTOGRAPHS_FAIL: {
      return {
        ...state,
        photographs: [],
        loaded: true,
      };
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
    case PHOTOGRAPH_FAIL: {
      return false;
    }
  }

  return state;
};
