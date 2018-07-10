import { createSelector } from 'reselect';

import { getProfile } from './auth';

export const getPhotographs = (state) => state.photographs.photographs;
export const getPhotographsLoadingState = (state) => state.photographs.loaded;
export const getPhotograph = (state) => state.currentPhotograph;


