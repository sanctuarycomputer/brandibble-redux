import reduxCrud from 'redux-crud';
const baseReducers = reduxCrud.Map.reducersFor('payments', {key: 'customer_card_id'});

const initialState = {};

import { SET_DEFAULT_PAYMENT } from 'actions/session/payments';

function setDefault(state, id) {
  let newState = {};
  Object.keys(state).forEach((paymentId) => {
    let payment = state[paymentId];
    if (id.toString() === paymentId) newState[paymentId] = Object.assign({}, payment, { is_default: true });
    else newState[paymentId] = Object.assign({}, payment, { is_default: false });
  })
  return newState;
}

export default function payments(state=initialState, action) {
  switch(action.type) {
    case `${SET_DEFAULT_PAYMENT}_FULFILLED`:
      return setDefault(state, action.payload);
    default:
      return baseReducers(state, action);
  }
}
