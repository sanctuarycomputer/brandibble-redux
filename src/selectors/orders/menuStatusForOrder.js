import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';
import { DateTime } from 'luxon';
import get from '../../utils/get';
import { Asap, MenuStatusCodes } from '../../utils/constants';

import { validOrderTimeForNow } from './validOrderTimeForNow';

// STATUSES
const {
  FUTURE_ORDER_REQUEST,
  ASAP_ORDER_REQUEST,
  INVALID_REQUESTED_AT,
  REQUESTED_AT_HAS_PASSED,
  ORDERING_FOR_CURRENT_DAYPART,
  ORDERING_FOR_FUTURE_DAYPART,
} = MenuStatusCodes;

/**
 * The validOrderTimeForNow
 * represents the FIRST valid order time
 * for a location, regardless of when the order is
 * being requested for
 */
export const menuStatusForOrder = createSelector(
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

      /**
       * Customer requests future order
       */
      if (wantsFutureOrder) {
        return {
          statusCode: FUTURE_ORDER_REQUEST,
          meta: {
            orderRequestedAt: requestedAtForCurrentOrder,
            validOrderTimeForOrder,
          },
        };
        /**
         * Customer DID NOT request future order
         */
      } else {
        /**
         * Order for 'asap' (only applies to olo orders for now)
         */
        if (requestedAtForCurrentOrder === Asap) {
          return {
            statusCode: ASAP_ORDER_REQUEST,
            meta: {
              validOrderTimeForOrder,
            },

            // TODO: CHECK IF RESTAURANT IS CURRENTLY CLOSED (E.G. FOR THE NIGHT)
          };
          /**
           * NOT for 'asap'
           */
        } else {
          /**
           * No validOrderTimeForOrder was found
           */
          if (!validOrderTimeForOrder) {
            return {
              statusCode: INVALID_REQUESTED_AT,
              meta: {
                firstAvailableOrderTime: validOrderTimeForNow,
              },
            };
          }
          /**
           * validOrderTimeForOrder has passed
           */
          if (
            DateTime.fromISO(validOrderTimeForOrder.utc) <
            DateTime.fromISO(validOrderTimeForNow.utc)
          ) {
            return {
              statusCode: REQUESTED_AT_HAS_PASSED,
              meta: {
                firstAvailableOrderTime: validOrderTimeForNow,
              },
            };
          }

          /**
           * validOrderTimeForOrder is current daypart
           */
          if (
            DateTime.fromISO(validOrderTimeForOrder.utc) ===
            DateTime.fromISO(validOrderTimeForNow.utc)
          ) {
            return {
              statusCode: ORDERING_FOR_CURRENT_DAYPART,
              meta: {
                currentDaypart,
              },
            };

            // TODO: CHECK IF RESTAURANT IS CURRENTLY CLOSED (E.G. FOR THE NIGHT)
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
                validOrderTimeForOrder,
                currentDaypart,
              },
            };
          }
        }
      }
    }),
);

// {
//   wantsFutureOrder: Bool,
//   nextAvailableDaypart: Object,
//   status: String/Object,
// }

// const mapStateToProps = state => ({
//   menuStatusForOrder: menuStatusForOrder(state.brandibble)(
//     validOrderTimeForOrder(state)(
//       luxonDateTimeFromRequestedAt(state.session.order.orderData.requested_at),
//     ),
//   ),
// });

/**
 * 1. Wants Future
 */

//  {
//    status: FUTURE_ORDER_REQUEST,
//    meta: {
//      orderRequestedAt: String
//    }
//  }

/**
 * 1. Not wants future
 */

// 'ASAP'

//  {
//    status: ORDER_FOR_ASAP,
//    meta: {
//      currentDaypart: currentDaypart/validOrderTimeForNow/nextAvailableDaypart,
//      locationIsClosed: false
//    }
//  }

// Location is currently closed
// {
//   status: ORDER_FOR_ASAP,
//   meta: {
//     currentDaypart: currentDaypart/validOrderTimeForNow/nextAvailableDaypart,
//     locationIsClosed: true
//   }
// }

// NOT 'ASAP

// No location data/ no validOrderTimeForOrder

//  {
//    status: NO_LOCATION_DATA,
//    meta: null
//  }

// Requested at has past

//  {
//    status: REQUESTED_AT_HAS_PAST,
//    meta: {
//      nextAvailableDaypart: {}
//    }
//  }

// Requested at for current daypart

//  {
//    status: REQUESTED_FOR_CURRENT_DAYPART,
//    meta: {
//      currentDaypart: {},
//      locationIsClosed: Bool
//    }
//  }

// Future Order

//  {
//    status: REQUESTED_FOR_CURRENT_DAYPART,
//    meta: {
//      currentDaypart: {},
//      locationIsClosed: Bool
//    }
//  }
