import {
  FETCH_LEVELUP_LOYALTY,
  FETCH_LEVELUP_QR_CODE,
  FETCH_LEVELUP_PAYMENT_METHOD,
  CONNECT_LEVELUP,
  DISCONNECT_LEVELUP,
} from 'actions/session/user';

const initialState = {
  loyalty: {},
  qr_code: null,
  payment_method: null,
  is_levelup_connected: false,
};

export default function levelup(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_LEVELUP_LOYALTY}_FULFILLED`:
      return {
        ...state,
        loyalty: action.payload,
      };
    case `${FETCH_LEVELUP_QR_CODE}_FULFILLED`:
      return {
        ...state,
        qr_code: action.payload,
      };
    case `${FETCH_LEVELUP_PAYMENT_METHOD}_FULFILLED`:
      return {
        ...state,
        payment_method: action.payload,
      };
    case `${CONNECT_LEVELUP}_FULFILLED`:
      return {
        ...state,
        is_levelup_connected: action.payload,
      };
    case `${DISCONNECT_LEVELUP}_FULFILLED`:
      return {
        ...state,
        is_levelup_connected: false,
      };
    default:
      return state;
  }
}
