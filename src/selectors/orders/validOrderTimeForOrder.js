import { createSelector } from 'reselect';
import { DateTime } from 'luxon';
import _memoize from 'lodash.memoize';
import get from '../../utils/get';

import convertDateTimeToMinutes from '../../utils/convertDateTimeToMinutes';

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
    _memoize(
      (
        luxonDateTimeFromOrderRequestedAt,
        todayAsLuxonDateTime = DateTime.local(),
      ) => {
        const locationForCurrentOrder = get(
          allLocationsById,
          `${locationIdForCurrentOrder}`,
        );

        /**
         * We could not find location for the current order
         * So we return null
         */
        if (!locationForCurrentOrder) return null;

        /**
         * Days Ahead
         * Catering: null
         * OLO: integer
         */
        const daysAheadForServiceType = get(
          locationForCurrentOrder,
          `days_ahead.${serviceTypeForCurrentOrder}`,
        );

        /**
         * If days ahead exists
         * Let's ensure the requested_at is
         * within that range
         */
        if (daysAheadForServiceType) {
          const differenceInDays = luxonDateTimeFromOrderRequestedAt
            .diff(todayAsLuxonDateTime, 'days')
            .toObject().days;

          /**
           * The requested_at is too far in advance
           * so we return null
           */
          if (differenceInDays > daysAheadForServiceType) return null;

          /**
           * The requested_at is in the past
           * so we return null
           */
          if (differenceInDays < 0) return null;
        }

        const currentDaypart = get(
          locationForCurrentOrder,
          `current_daypart.${serviceTypeForCurrentOrder}`,
        );

        const orderRequestedAtInMinutes = convertDateTimeToMinutes(
          luxonDateTimeFromOrderRequestedAt,
        );

        debugger;

        // 1. Check if the requested at is the same as the first_time

        // 2. If it's not,
      },
    ),
);
