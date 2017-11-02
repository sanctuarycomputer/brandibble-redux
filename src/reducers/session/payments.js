import Immutable from 'seamless-immutable';

import {
  CREATE_PAYMENT,
  DELETE_PAYMENT,
  FETCH_PAYMENTS,
  SET_DEFAULT_PAYMENT,
} from 'actions/session/payments';

import { UNAUTHENTICATE_USER } from 'actions/session/user';

export const initialState = Immutable({
  paymentsById: Immutable({}),
});

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    /*
     * Weirdly, credit_cards#create returns an array instead
     * of an object. Here we merge it instead of adding a single
     * object.
     */
    case `${CREATE_PAYMENT}_FULFILLED`:
    case `${FETCH_PAYMENTS}_FULFILLED`:
      return state.merge({
        paymentsById: state.paymentsById.replace(Immutable.asObject(payload, (payment) => {
          return [payment.customer_card_id, payment];
        })),
      });

    case `${DELETE_PAYMENT}_FULFILLED`:
      return state.merge({
        paymentsById: state.paymentsById.without((v, k) => {
          return k === `${payload}` && v.customer_card_id === payload;
        }),
      });

    case `${SET_DEFAULT_PAYMENT}_FULFILLED`:
      let newState = state;

      let currentDefault = Object.values(state.paymentsById.asMutable()).find(p => p.is_default);
      if (!!currentDefault) {
        newState = state.merge({
          paymentsById: newState.paymentsById.setIn([currentDefault.customer_card_id, 'is_default'], false)
        });
      }

      let newDefault = Object.values(state.paymentsById.asMutable()).find(p => p.customer_card_id === action.payload);
      if (!!newDefault) {
        newState = state.merge({
          paymentsById: newState.paymentsById.setIn([newDefault.customer_card_id, 'is_default'], true)
        });
      }

      return newState;

    case `${UNAUTHENTICATE_USER}_FULFILLED`:
      return initialState;
    default:
      return state;
  }
};
