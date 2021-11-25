import qs from 'qs';

export const createURL = state => `?${qs.stringify(state)}`;

export const searchStateToURL = (location, searchState) =>
  searchState ? `${location.pathname}?${qs.stringify(searchState)}` : "";

export const pathToSearchState = path =>
  path.includes("?") ? qs.parse(path.substring(path.indexOf("?") + 1)) : {};

  

