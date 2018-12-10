import { FETCH_CUSTOMER_LOYALTIES } from '../../actions/user/loyalties';

import {
  UNAUTHENTICATE_USER,
} from '../../actions/session/user';

export const initialState = {
  loyalties: [],
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case `${FETCH_CUSTOMER_LOYALTIES}_FULFILLED`:
      return {
        ...state,
        loyalties: payload
      };
      case `${UNAUTHENTICATE_USER}_FULFILLED`:
        return initialState;
    default:
      return state;
  }
};