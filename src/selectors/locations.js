import { createSelector } from 'reselect';
import get from 'utils/get';
import find from 'lodash.find';

export const locationsCollection = state => state.data.locations.locationsById;

export const locationsAsArray = createSelector(
  locationsCollection,
  locations => Object.values(locations),
);

export const currentLocation = createSelector(
  state => locationsAsArray(state),
  state => get(state, 'session.order.orderData.location_id'),
  (locationsAsArray, location_id) => find(locationsAsArray, { location_id })
);
