/* global describe it beforeEach */
import { expect } from 'chai';
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  FETCH_ADDRESSES,
} from 'actions/session/addresses';
import reducer, { initialState } from 'reducers/session/addresses';
import { addressStub } from '../../config/stubs';

describe('reducers/session/addresses', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it(`handles the ${FETCH_ADDRESSES}_FULFILLED action`, () => {
    const reduced = reducer(initialState, {
      type: `${FETCH_ADDRESSES}_FULFILLED`,
      payload: [addressStub],
    });
    expect(reduced.addressesById[addressStub.customer_address_id]).to.exist;
  });

  describe('create / delete', () => {
    let reduced;
    beforeEach(() => {
      reduced = reducer(initialState, {
        type: `${CREATE_ADDRESS}_FULFILLED`,
        payload: addressStub,
      });
    });

    it(`handles the ${CREATE_ADDRESS}_FULFILLED action`, () => {
      expect(reduced.addressesById[addressStub.customer_address_id]).to.exist;
    });

    it(`handles the ${DELETE_ADDRESS}_FULFILLED action`, () => {
      const reducedAfterDelete = reducer(reduced, {
        type: `${DELETE_ADDRESS}_FULFILLED`,
        payload: addressStub.customer_address_id,
      });
      expect(reducedAfterDelete.addressesById[addressStub.customer_address_id]).to.not.exist;
    });
  });
});
