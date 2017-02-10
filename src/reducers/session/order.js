import { RESOLVE_ORDER } from 'actions/session/order';
const initialState = {};

export default function order(state=initialState, action) {
  switch(action.type) {
    case `${RESOLVE_ORDER}_FULFILLED`:
      return action.payload;
    default:
      return state;
  }
}
