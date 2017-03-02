import { SETUP_BRANDIBBLE } from 'actions/setup';

const initialState = {};

export default function ref(state = initialState, action) {
  switch (action.type) {
    case `${SETUP_BRANDIBBLE}_FULFILLED`:
      return action.payload;
    default:
      return state;
  }
}
