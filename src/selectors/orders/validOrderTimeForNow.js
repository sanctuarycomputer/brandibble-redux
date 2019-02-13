import { createSelector } from 'reselect';
import get from '../../utils/get';

/**
 * The validOrderTimeForNow
 * represents the FIRST valid order time
 * for a location, regardless of when the order is
 * being requested for
 */
export const validOrderTimeForNow = createSelector(
  state => get(state, 'session.order.orderData.location_id'),
  state => get(state, 'session.order.orderData.service_type'),
  state => get(state, 'data.locations.locationsById'),
  (locationIdForCurrentOrder, serviceTypeForCurrentOrder, allLocationsById) => {
    const locationForCurrentOrder = get(
      allLocationsById,
      `${locationIdForCurrentOrder}`,
    );

    return get(
      locationForCurrentOrder,
      `first_times.${serviceTypeForCurrentOrder}`,
    );
  },
);
