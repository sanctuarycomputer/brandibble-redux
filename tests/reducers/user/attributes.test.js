/* global describe it */
import { expect } from 'chai';
import { AUTHENTICATE_USER, RESOLVE_USER, UNAUTHENTICATE_USER } from 'actions/session/user';
import reducer from 'reducers/user/attributes';
import { authResponseStub } from '../../config/stubs';

const initialState = {};
const payload = authResponseStub;

describe('reducers/user/attributes', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the AUTHENTICATE_USER_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${AUTHENTICATE_USER}_FULFILLED`,
      payload,
    });
    expect(reduced).to.equal(payload);
  });

  it('handles the UNAUTHENTICATE_USER_FULFILLED action', () => {
    const reduced = reducer(payload, {
      type: `${UNAUTHENTICATE_USER}_FULFILLED`,
    });
    expect(reduced).to.deep.equal(initialState);
  });

  it('handles the RESOLVE_USER_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${RESOLVE_USER}_FULFILLED`,
      payload,
    });
    expect(reduced).to.equal(payload);
  });
});
