/* global describe it */
import { expect } from 'chai';
import reducer from 'reducers/session/payments';
import Immutable from 'seamless-immutable';

import {
  FETCH_PAYMENTS,
  CREATE_PAYMENT,
  DELETE_PAYMENT,
  SET_DEFAULT_PAYMENT,
} from 'actions/session/payments';

export const initialState = Immutable({
  paymentsById: Immutable({}),
});

describe('reducers/session/payments', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the FETCH_PAYMENTS_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${FETCH_PAYMENTS}_FULFILLED`,
      payload: [{ customer_card_id: 1 }],
    });
    let result = reduced.paymentsById.asMutable();
    expect(result).to.eql({ '1': { customer_card_id: 1 } });
  });

  it('handles the SET_DEFAULT_PAYMENT_FULFILLED action', () => {
    const reduced = reducer(Immutable({
      paymentsById: Immutable({
        1: { customer_card_id: 1, is_default: false },
        2: { customer_card_id: 2, is_default: true },
      })
    }), {
      type: `${SET_DEFAULT_PAYMENT}_FULFILLED`,
      payload: 1,
    });
    let result = reduced.paymentsById.asMutable();
    expect(result[1].is_default).to.be.true;
    expect(result[2].is_default).to.be.false;
  });

  it('handles the DELETE_PAYMENT_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${DELETE_PAYMENT}_FULFILLED`,
      payload: { customer_card_id: 1 },
    });
    let result = reduced.paymentsById.asMutable();
    expect(result).to.eql({});
  });

  it('handles the CREATE_PAYMENT_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${CREATE_PAYMENT}_FULFILLED`,
      payload: [{ customer_card_id: 1 }],
    });
    let result = reduced.paymentsById.asMutable();
    expect(result).to.eql({ '1': { customer_card_id: 1 } });
  });

});
