import reduxCrud from 'redux-crud';
const baseReducers = reduxCrud.Map.reducersFor('payments', {key: 'customer_card_id'});

const initialState = {};

import { SET_DEFAULT_PAYMENT } from 'actions/session/payments';

function setDefault(state, id) {
  let stringId = id.toString();
  Object.keys(state).map((key, i) => {
    if (key !== stringId) state[key].is_default = false;
    else state[key].is_default = true;
  })
  return state;
}

export default function addresses(state=initialState, action) {
  switch(action.type) {
    case `${SET_DEFAULT_PAYMENT}_FULFILLED`:
      return setDefault(state, action.payload);
    default:
      return baseReducers(state, action);
  }
}
