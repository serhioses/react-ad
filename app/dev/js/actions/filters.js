import { FILTER } from '@app-constants/filters';

export const search = (searchText) => {
  return {
    type: FILTER,
    payload: {
      searchText,
    }
  };
}
