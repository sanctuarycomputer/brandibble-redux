import {
  FETCH_LEVELUP_LOYALTY,
  FETCH_LEVELUP_QR_CODE,
} from 'actions/session/user';

const initialState = {
  loyalty: {},
  qr_code: null,
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
    default:
      return state;
  }
}
