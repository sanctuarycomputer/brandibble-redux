import { createSelector } from 'reselect';

export const favoritesCollection = state => state.session.favorites.favoritesById;

export const favoritesAsArray = createSelector(
  favoritesCollection,
  favorites => Object.values(favorites),
);
