/* global describe it */
import { expect } from 'chai';
import { VALIDATE_USER } from 'actions/session/user';
import reducer from 'reducers/user/validations';
import { customersValidateStub } from '../../config/stubs';

const initialState = {};
const payload = customersValidateStub;

describe('reducers/user/validations', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the VALIDATE_USER_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${VALIDATE_USER}_FULFILLED`,
      payload,
    });
    expect(reduced).to.equal(payload);
  });
});
