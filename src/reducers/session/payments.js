import reduce from 'lodash.reduce';
import pickBy from 'lodash.pickby';
import { UNAUTHENTICATE_USER } from '../../actions/session/user';
import {
  CREATE_PAYMENT,
  DELETE_PAYMENT,
  FETCH_PAYMENTS,
  SET_DEFAULT_PAYMENT,
} from '../../actions/session/payments';

export const initialState = {
  paymentsById: {},
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  let newState;

  switch (type) {
    /*
     * Weirdly, credit_cards#create returns an array instead
     * of an object. Here we merge it instead of adding a single
     * object.
     */
    case `${CREATE_PAYMENT}_FULFILLED`:
    case `${FETCH_PAYMENTS}_FULFILLED`:
      return {
        ...state,
        paymentsById: reduce(
          payload,
          (acc, curr) => ({ ...acc, [`${curr.customer_card_id}`]: curr }),
          {},
        ),
      };

    case `${DELETE_PAYMENT}_FULFILLED`:
      return {
        ...state,
        paymentsById: pickBy(
          state.paymentsById,
          (v, k) => !(k === `${payload}` && v.customer_card_id === payload),
        ),
      };

    case `${SET_DEFAULT_PAYMENT}_FULFILLED`:
      const currentDefault = Object.values(state.paymentsById).find(p => p.is_default);
      if (currentDefault) {
        newState = {
          ...state,
          paymentsById: {
            ...state.paymentsById,
            [currentDefault.customer_card_id]: {
              ...state.paymentsById[currentDefault.customer_card_id],
              is_default: false,
            },
          },
        };
      }

      const newDefault = Object.values(state.paymentsById).find(p => p.customer_card_id === action.payload);
      if (newDefault) {
        newState = {
          ...newState,
          paymentsById: {
            ...newState.paymentsById,
            [newDefault.customer_card_id]: {
              ...newState.paymentsById[newDefault.customer_card_id],
              is_default: true,
            },
          },
        };
      }

      return newState;

    case `${UNAUTHENTICATE_USER}_FULFILLED`:
      return initialState;
    default:
      return state;
  }
};
