import { FILTER } from '@app-constants/filters';

const initialState = {
  searchText: '',
};

export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
  }

  return state;
}
