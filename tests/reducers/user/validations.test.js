import { expect } from 'chai';
import { customersValidateStub } from '../../config/stubs';
import { VALIDATE_USER } from 'actions/session/user';
import reducer from 'reducers/user/validations';

const initialState = {};
const payload = customersValidateStub;

describe('reducers/user/validations', () => {
  it('should return the initial state', () => {
    expect(
      reducer(initialState, {})
    ).to.equal(initialState);
  });

  it('handles the VALIDATE_USER_FULFILLED action', () => {
    let reduced = reducer(initialState, {
      type: `${VALIDATE_USER}_FULFILLED`,
      payload,
    });
    expect(reduced).to.equal(payload);
  });
});
