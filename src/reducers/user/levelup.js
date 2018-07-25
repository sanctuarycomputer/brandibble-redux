import {
  FETCH_LEVELUP_LOYALTY,
  FETCH_LEVELUP_CAMPAIGN,
  FETCH_LEVELUP_QR_CODE,
  FETCH_LEVELUP_PAYMENT_METHOD,
  DISCONNECT_LEVELUP,
  UNAUTHENTICATE_USER,
} from '../../actions/session/user';

const initialState = {
  loyalty: {},
  qr_code: null,
  payment_method: null,
  campaignsById: {},
};

export default function levelup(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_LEVELUP_LOYALTY}_FULFILLED`:
      return {
        ...state,
        loyalty: action.payload,
      };
    case `${FETCH_LEVELUP_CAMPAIGN}_FULFILLED`:
      return {
        ...state,
        campaignsById: {
          ...state.campaignsById,
          [`${action.payload.meta.campaignId}-${action.payload.meta.campaignType}`]: action.payload.campaign,
        },
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
    case `${UNAUTHENTICATE_USER}_FULFILLED`:
    case `${DISCONNECT_LEVELUP}_FULFILLED`:
      return initialState;
    default:
      return state;
  }
}
