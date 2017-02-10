import {
  AUTHENTICATE_USER,
  RESOLVE_USER,
  UNAUTHENTICATE_USER,
} from 'actions/session/user';
const initialState = {};

export default function attributes(state=initialState, action) {
  switch(action.type) {
    case `${RESOLVE_USER}_FULFILLED`:
    case `${AUTHENTICATE_USER}_FULFILLED`:
      return action.payload;
    case `${UNAUTHENTICATE_USER}_FULFILLED`:
      return initialState;
    default:
      return state;
  }
}
