import {
  FETCH_ALL_CUSTOMER_ORDERS,
  FETCH_PAST_CUSTOMER_ORDERS,
  FETCH_UPCOMING_CUSTOMER_ORDERS,
} from 'actions/data/customerOrders';

import {
  SUBMIT_ORDER
} from 'actions/session/order';

import {
  UNAUTHENTICATE_USER
} from 'actions/session/user';

const initialState = {
  all: null,
  past: null,
  recentSubmission: null,
  upcoming: null,
};

export default function customerOrders(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_ALL_CUSTOMER_ORDERS}_FULFILLED`:
      return {
        ...state,
        all: action.payload,
      };
    case `${SUBMIT_ORDER}_FULFILLED`: {
      return {
        ...state,
        recentSubmission: action.payload
      };
    }
    case `${FETCH_PAST_CUSTOMER_ORDERS}_FULFILLED`:
      return {
        ...state,
        past: action.payload,
      };
    case `${FETCH_UPCOMING_CUSTOMER_ORDERS}_FULFILLED`:
      return {
        ...state,
        upcoming: action.payload,
      };
    case `${UNAUTHENTICATE_USER}_FULFILLED`:
      return initialState;
    default:
      return state;
  }
}
