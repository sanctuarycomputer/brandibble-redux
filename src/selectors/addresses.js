import { createSelector } from 'reselect';

export const addressesCollection = state => state.data.addresses.addressesById;

export const addressesAsArray = createSelector(
  addressesCollection,
  addresses => Object.values(addresses),
);
