import { createSelector } from 'reselect';
import _memoize from 'lodash.memoize';
import get from '../../utils/get';

/**
 * The validOrderTimeForNow
 * represents the FIRST valid order time
 * for a location, regardless of when the order is
 * being requested for
 */
export const validOrderTimeForOrder = createSelector(
  state => get(state, 'session.order.orderData.location_id'),
  state => get(state, 'session.order.orderData.service_type'),
  state => get(state, 'data.locations.locationsById'),
  (locationIdForCurrentOrder, serviceTypeForCurrentOrder, allLocationsById) =>
    _memoize((luxonDateTimeFromOrderRequestedAt) => {
      console.log(locationIdForCurrentOrder);
      console.log(serviceTypeForCurrentOrder);
      console.log(allLocationsById);
      console.log(luxonDateTimeFromOrderRequestedAt);
    }),
);
