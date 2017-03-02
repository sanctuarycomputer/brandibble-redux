/* global describe it */
import { expect } from 'chai';
import { authResponseStub, brandibble } from '../config/stubs';
import { AUTHENTICATE_USER } from 'actions/session/user';
import { SETUP_BRANDIBBLE } from 'actions/setup';
import reducer from 'reducers/ref';

const initialState = {};

describe('reducers/ref', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the SETUP_BRANDIBBLE_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${SETUP_BRANDIBBLE}_FULFILLED`,
      payload: brandibble,
    });
    expect(reduced).to.deep.equal(brandibble);
  });
});
