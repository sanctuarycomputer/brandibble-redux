import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';
import { DateTime } from 'luxon';
import get from '../../utils/get';
import { Asap, MenuStatusCodes } from '../../utils/constants';
import luxonDateTimeFromRequestedAt from '../../utils/luxonDateTimeFromRequestedAt';

import { validOrderTimeForNow } from './validOrderTimeForNow';
import { validOrderTimeForOrder } from './validOrderTimeForOrder';

const {
  FUTURE_ORDER_REQUEST,
  ASAP_ORDER_REQUEST,
  INVALID_REQUESTED_AT,
  REQUESTED_AT_HAS_PASSED,
  ORDERING_FOR_FIRST_AVAILABLE_VALID_TIME,
  ORDERING_FOR_FUTURE_DAYPART,
} = MenuStatusCodes;

/**
 * The validOrderTimeForNow
 * represents the FIRST valid order time
 * for a location, regardless of when the order is
 * being requested for
 */
export const _menuStatusForOrder = createSelector(
  state => get(state, 'session.order.orderData'),
  state => get(state, 'data.locations.locationsById'),
  state => validOrderTimeForNow(state),
  (orderData, locationsById, validOrderTimeForNow) =>
    memoize((validOrderTimeForOrder) => {
      const locationIdForCurrentOrder = get(orderData, 'location_id');
      const wantsFutureOrder = get(orderData, 'wantsFutureOrder');
      const requestedAtForCurrentOrder = get(orderData, 'requested_at');
      const serviceTypeForCurrentOrder = get(orderData, 'service_type');
      const locationForCurrentOrder = get(
        locationsById,
        `${locationIdForCurrentOrder}`,
      );
      const currentDaypart = get(
        locationForCurrentOrder,
        `current_daypart.${serviceTypeForCurrentOrder}`,
      );

      /** wantsFutureOrder = true */

      /**
       * No validOrderTimeForOrder was found
       */
      if (!validOrderTimeForOrder) {
        return {
          statusCode: INVALID_REQUESTED_AT,
        };
      }

      /** wantsFutureOrder = false */

      /** requestedAt === 'asap' */

      /**
       * validOrderTimeForOrder has passed
       */
      if (
        DateTime.fromISO(validOrderTimeForOrder.utc) <
        DateTime.fromISO(validOrderTimeForNow.utc)
      ) {
        return {
          statusCode: REQUESTED_AT_HAS_PASSED,
        };
      }

      /** wantsFutureOrder = true */

      /**
       * Customer requests future order
       */
      if (wantsFutureOrder) {
        return {
          statusCode: FUTURE_ORDER_REQUEST,
          meta: {
            validOrderTimeForOrder,
          },
        };
      }

      /** wantsFutureOrder = false */

      /** requestedAt === 'asap' */

      /**
       * Order for 'asap' (only applies to olo orders for now)
       */
      if (requestedAtForCurrentOrder === Asap) {
        return {
          statusCode: ASAP_ORDER_REQUEST,
          meta: {
            currentDaypart,
            currentDaypartIsOrderable: get(currentDaypart, 'is_orderable'),
            currentDaypartIsInTheFuture:
              get(currentDaypart, 'is_orderable') &&
              !get(currentDaypart, 'is_current'),
            validOrderTimeForOrder,
          },
        };
      }

      /** requestedAt !== 'asap' */

      /**
       * validOrderTimeForOrder is the same as the validOrderTimeForNow
       */
      if (validOrderTimeForOrder.utc === validOrderTimeForNow.utc) {
        return {
          statusCode: ORDERING_FOR_FIRST_AVAILABLE_VALID_TIME,
          meta: {
            currentDaypart,
            currentDaypartIsOrderable: get(currentDaypart, 'is_orderable'),
            currentDaypartIsInTheFuture:
              get(currentDaypart, 'is_orderable') &&
              !get(currentDaypart, 'is_current'),
            validOrderTimeForOrder,
          },
        };
      }

      /**
       * validOrderTimeForOrder is in the future
       */
      if (
        DateTime.fromISO(validOrderTimeForOrder.utc) >
        DateTime.fromISO(validOrderTimeForNow.utc)
      ) {
        return {
          statusCode: ORDERING_FOR_FUTURE_DAYPART,
          meta: {
            unorderableCurrentDaypart: currentDaypart,
            validOrderTimeForOrder,
          },
        };
      }
    }),
);

export const menuStatusForOrder = createSelector(state =>
  _menuStatusForOrder(state)(
    validOrderTimeForOrder(state)(
      luxonDateTimeFromRequestedAt(
        get(state, 'session.order.orderData.requested_at'),
      ),
    ),
  ),
);
