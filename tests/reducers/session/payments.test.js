/* global describe it */
import { expect } from 'chai';
import reduxCrud from 'redux-crud';
import reducer from 'reducers/session/payments';

const {
  PAYMENTS_FETCH_SUCCESS,
  PAYMENTS_DELETE_SUCCESS,
  PAYMENTS_CREATE_SUCCESS,
} = reduxCrud.actionTypesFor('payments');
const initialState = {};

describe('reducers/session/payments', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the PAYMENTS_FETCH_SUCCESS action', () => {
    const reduced = reducer(initialState, {
      type: PAYMENTS_FETCH_SUCCESS,
      records: [{ customer_card_id: 1 }],
    });
    expect(reduced);
  });

  it('handles the PAYMENTS_DELETE_SUCCESS action', () => {
    const reduced = reducer(initialState, {
      type: PAYMENTS_DELETE_SUCCESS,
      record: { customer_card_id: 1 },
    });
    expect(reduced);
  });

  it('handles the PAYMENTS_CREATE_SUCCESS action', () => {
    const reduced = reducer(initialState, {
      type: PAYMENTS_CREATE_SUCCESS,
      record: { customer_card_id: 1 },
    });
    expect(reduced);
  });
});
