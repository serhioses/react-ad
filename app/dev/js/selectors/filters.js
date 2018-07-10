import { createSelector } from 'reselect';

import { getPhotographs } from './photograph';

export const getFilters = (state) => state.filters;

export const getSearchText = (state) => getFilters(state).searchText;

export const getShowOnlyOwnPhotographsFilter = (state) => getFilters(state).showOnlyOwnPhotographs;

export const getFilteredPhotographs = createSelector(
  [getSearchText, getPhotographs],
  (searchText, photographs) => {
    let filteredPhotographs = photographs.slice();

    if (searchText) {
      filteredPhotographs = filteredPhotographs.filter((photograph) => {
        return photograph.name.toLowerCase().indexOf(searchText) !== -1;
      });
    }

    // if (showOnlyOwnPhotographs && profile && profile.uuid) {
    //   filteredPhotographs = filteredPhotographs.filter((photograph) => {
    //     return photograph.userId === profile.uuid;
    //   });
    // }

    return filteredPhotographs;
  }
);
