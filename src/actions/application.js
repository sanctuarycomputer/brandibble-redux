import isEmpty from 'lodash.isempty';
import fireAction from '../utils/fireAction';
import handleErrors from '../utils/handleErrors';
import get from '../utils/get';
import {
  discoverReduxNamespace,
  getStateWithNamespace,
} from '../utils/getStateWithNamespace';
import luxonDateTimeFromRequestedAt from '../utils/luxonDateTimeFromRequestedAt';
import { supportsCatering } from '../utils/orderTypes';
import { Asap, MenuStatusCodes, SystemTimezoneMap } from '../utils/constants';
import { resolveOrder, setRequestedAt } from './session/order';
import { resolveUser } from './session/user';
import { fetchBrand } from './data/brands';

import {
  menuStatusForOrder,
  validOrderTimeForOrder,
  validOrderTimeForNow,
} from '../selectors';
import { _menuStatusForOrder } from '../selectors/orders/menuStatusForOrder';

export const SETUP_BRANDIBBLE = 'SETUP_BRANDIBBLE';
export const SETUP_BRANDIBBLE_REDUX = 'SETUP_BRANDIBBLE_REDUX';
export const SEND_SUPPORT_TICKET = 'SEND_SUPPORT_TICKET';
export const RESET_APPLICATION = 'RESET_APPLICATION';

// setupBrandibble
export const setupBrandibble = brandibble => (dispatch) => {
  const payload = brandibble.setup().catch(handleErrors);
  return dispatch(fireAction(SETUP_BRANDIBBLE, payload));
};

// updateRequestedAtListener
/**
 * the testArgument object is an optional param,
 * which should only be passed in a testing scenario
 * @param {string} [testArguments={}] - testArguments
 */
export const updateInvalidOrderRequestedAt = (testArguments = {}) => (
  dispatch,
  getState,
) => {
  const isTestMode = !isEmpty(testArguments);
  const state = getStateWithNamespace(getState);

  if (isEmpty(state)) return Promise.resolve();

  const currentOrderLocationId = get(
    state,
    'session.order.orderData.location_id',
  );
  const currentOrderRequestedAt = get(
    state,
    'session.order.orderData.requested_at',
  );
  const orderTypesForCurrentOrderLocation = get(
    state,
    `data.locations.locationsById.${currentOrderLocationId}.order_types`,
  );
  const isCateringLocation = supportsCatering(
    orderTypesForCurrentOrderLocation,
  );
  const orderRef = isTestMode
    ? get(testArguments, 'orderRef')
    : get(state, 'session.order.ref');

  if (!orderRef) return Promise.resolve();

  return new Promise((resolve) => {
    /**
     * A catering order cannot be requested with a string of 'asap'
     * So if for some reason it has been, we update it here.
     * Otherwise we resolve.
     */

    if (isCateringLocation && currentOrderRequestedAt === Asap) {
      const timezoneForCurrentLocation = get(
        state,
        `data.locations.locationsById.${currentOrderLocationId}.timezone`,
      );
      const newRequestedAtAsLuxonDateTime = isTestMode
        ? get(testArguments, 'todayAsLuxonDateTime')
        : luxonDateTimeFromRequestedAt(
            currentOrderRequestedAt,
            SystemTimezoneMap[timezoneForCurrentLocation],
          );
      const newRequestedAtAsISO8601 = `${
        newRequestedAtAsLuxonDateTime
          .setZone('utc')
          .toISO()
          .split('.')[0]
      }Z`;
      return dispatch(
        setRequestedAt(orderRef, newRequestedAtAsISO8601, false),
      ).then(resolve);
    }
    return resolve();
  }).then(() => {
    const menuStatus = isTestMode
      ? _menuStatusForOrder(state)(
          validOrderTimeForOrder(state)(
            get(testArguments, 'requestedAtAsLuxonDateTime'),
            get(testArguments, 'todayAsLuxonDateTime'),
          ),
        )
      : menuStatusForOrder(state);

    const { INVALID_REQUESTED_AT, REQUESTED_AT_HAS_PASSED } = MenuStatusCodes;

    if (
      get(menuStatus, 'statusCode') === INVALID_REQUESTED_AT ||
      get(menuStatus, 'statusCode') === REQUESTED_AT_HAS_PASSED
    ) {
      let now;
      if (isCateringLocation) {
        const validOrderTime = validOrderTimeForNow(state);
        now = get(validOrderTime, 'utc');
      } else {
        now = Asap;
      }

      return dispatch(setRequestedAt(orderRef, now, false));
    }
    return Promise.resolve();
  });
};

// setupBrandibbleRedux
const setupBrandibbleReduxDefaults = {
  locationId: null,
  serviceType: 'pickup',
};
export const setupBrandibbleRedux = (
  brandibble,
  data = setupBrandibbleReduxDefaults,
) => (dispatch, getState) => {
  const { locationId, serviceType } = Object.assign(
    {},
    setupBrandibbleReduxDefaults,
    data,
  );

  const payload = dispatch(setupBrandibble(brandibble))
    .then(({ value }) => {
      discoverReduxNamespace(getState, value);
      return Promise.all([
        dispatch(resolveUser(value)),
        dispatch(resolveOrder(value, locationId, serviceType)),
        dispatch(fetchBrand(value)),
      ]);
    })
    .then(() => {
      dispatch(updateInvalidOrderRequestedAt());
      setInterval(() => dispatch(updateInvalidOrderRequestedAt()), 60000);
    })
    .catch(handleErrors);

  return dispatch(fireAction(SETUP_BRANDIBBLE_REDUX, payload));
};

// sendSupportTicket
const sendSupportTicketDefaults = {
  body: null,
  email: null,
  name: null,
  subject: null,
};
export const sendSupportTicket = (
  brandibble,
  data = sendSupportTicketDefaults,
) => (dispatch) => {
  const payload = brandibble
    .sendSupportTicket(Object.assign({}, sendSupportTicketDefaults, data))
    .catch(handleErrors);
  return dispatch(fireAction(SEND_SUPPORT_TICKET, payload));
};

export const resetApplication = brandibble => (dispatch) => {
  const payload = brandibble.reset().catch(handleErrors);
  return dispatch(fireAction(RESET_APPLICATION, payload))
    .then(() => {
      return dispatch(setupBrandibbleRedux(brandibble));
    })
    .catch(handleErrors);
};
