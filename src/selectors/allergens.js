import { createSelector } from 'reselect';

export const allergensCollection = state => state.data.allergens.allergensById;

export const allergensAsArray = createSelector(
  allergensCollection,
  allergens => Object.values(allergens),
);
