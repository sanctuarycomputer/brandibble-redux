import { resolveOrder } from 'actions/session/order';
import { resolveUser } from 'actions/session/user';

export const SETUP_BRANDIBBLE = 'SETUP_BRANDIBBLE';
export const SETUP_BRANDIBBLE_REDUX = 'SETUP_BRANDIBBLE_REDUX';

function _setupBrandibble(brandibble) {
  return {
    type: SETUP_BRANDIBBLE,
    payload: brandibble.setup(),
  };
}

function _setupBrandibbleRedux(payload) {
  return { type: SETUP_BRANDIBBLE_REDUX, payload };
}

export function setupBrandibble(Brandibble) {
  return dispatch => dispatch(_setupBrandibble(Brandibble));
}

export function setupBrandibbleRedux(Brandibble, defaultLocationId = null, defaultServiceType = 'delivery') {
  return (dispatch) => {
    const payload = dispatch(setupBrandibble(Brandibble)).then(({ value }) => {
      return Promise.all([
        dispatch(resolveUser(value)),
        dispatch(resolveOrder(value, defaultLocationId, defaultServiceType)),
      ]);
    });

    return dispatch(_setupBrandibbleRedux(payload));
  };
}
