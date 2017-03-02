/* global describe it */
import { expect } from 'chai';
import reduxCrud from 'redux-crud';
import reducer from 'reducers/session/addresses';

const {
  ADDRESSES_FETCH_SUCCESS,
  ADDRESSES_DELETE_SUCCESS,
  ADDRESSES_CREATE_SUCCESS,
} = reduxCrud.actionTypesFor('addresses');
const initialState = {};

describe('reducers/session/addresses', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the ADDRESSES_FETCH_SUCCESS action', () => {
    const reduced = reducer(initialState, {
      type: ADDRESSES_FETCH_SUCCESS,
      records: [{ customer_address_id: 1, street_address: 'Dad Zone' }],
    });
    expect(reduced);
  });

  it('handles the ADDRESSES_DELETE_SUCCESS action', () => {
    const reduced = reducer(initialState, {
      type: ADDRESSES_DELETE_SUCCESS,
      record: { customer_address_id: 1, street_address: 'Dad Zone' },
    });
    expect(reduced);
  });

  it('handles the ADDRESSES_CREATE_SUCCESS action', () => {
    const reduced = reducer(initialState, {
      type: ADDRESSES_CREATE_SUCCESS,
      record: { customer_address_id: 1, street_address: 'Dad Zone' },
    });
    expect(reduced);
  });
});
