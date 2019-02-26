import fireAction from '../utils/fireAction';
import handleErrors from '../utils/handleErrors';
import { resolveOrder } from './session/order';
import { resolveUser } from './session/user';
import { fetchBrand } from './data/brands';

export const SETUP_BRANDIBBLE = 'SETUP_BRANDIBBLE';
export const SETUP_BRANDIBBLE_REDUX = 'SETUP_BRANDIBBLE_REDUX';
export const SEND_SUPPORT_TICKET = 'SEND_SUPPORT_TICKET';
export const RESET_APPLICATION = 'RESET_APPLICATION';

// setupBrandibble
export const setupBrandibble = brandibble => (dispatch) => {
  const payload = brandibble.setup().catch(handleErrors);
  return dispatch(fireAction(SETUP_BRANDIBBLE, payload));
};

let reduxNamespace;

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

      getStateWithNamespace(getState);

      return Promise.all([
        dispatch(resolveUser(value)),
        dispatch(resolveOrder(value, locationId, serviceType)),
        dispatch(fetchBrand(value))
      ]);
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
