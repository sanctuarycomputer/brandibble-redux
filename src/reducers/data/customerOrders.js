import {
  FETCH_ALL_CUSTOMER_ORDERS,
  FETCH_PAST_CUSTOMER_ORDERS,
  FETCH_UPCOMING_CUSTOMER_ORDERS,
} from 'actions/data/customerOrders';

const initialState = {
  all: null,
  past: null,
  session: [],
  upcoming: null,
};

export default function customerOrders(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_ALL_CUSTOMER_ORDERS}_FULFILLED`:
      return {
        ...state,
        all: action.payload,
      };
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
    default:
      return state;
  }
}
