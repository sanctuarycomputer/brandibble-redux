import isEmpty from 'lodash.isempty';
import fireAction from '../utils/fireAction';
import handleErrors from '../utils/handleErrors';
import get from '../utils/get';
import {
  discoverReduxNamespace,
  getStateWithNamespace,
} from '../utils/getStateWithNamespace';
import { supportsCatering } from '../utils/orderTypes';
import { Asap, MenuStatusCodes } from '../utils/constants';
import { resolveOrder, setRequestedAt } from './session/order';
import { resolveUser } from './session/user';
import { fetchBrand } from './data/brands';

import { menuStatusForOrder } from '../selectors';

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

export const updateInvalidOrderRequestedAt = () => (dispatch, getState) => {
  const state = getState();

  if (isEmpty(state)) return;

  const orderRef = get(state, 'session.order.ref');
  const currentOrderLocationId = get(
    state,
    'session.order.orderData.location_id',
  );
  const orderTypesForCurrentOrderLocation = get(
    state,
    `data.locations.locationsById.${currentOrderLocationId}.order_types`,
  );
  const isCateringLocation = supportsCatering(
    orderTypesForCurrentOrderLocation,
  );
  const menuStatus = menuStatusForOrder(state);

  const { INVALID_REQUESTED_AT, REQUESTED_AT_HAS_PASSED } = MenuStatusCodes;

  if (
    get(menuStatus, 'statusCode') === INVALID_REQUESTED_AT &&
    get(menuStatus, 'statusCode') === REQUESTED_AT_HAS_PASSED
  ) {
    const now = isCateringLocation ? new Date() : Asap;
    return dispatch(setRequestedAt(orderRef, now));
  }
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
