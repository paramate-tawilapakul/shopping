import { createSelector } from 'reselect';

const selectDirectory = state => state.directory;

export const selectDirectorySestions = createSelector(
  [selectDirectory],
  directory => directory.sections
);
