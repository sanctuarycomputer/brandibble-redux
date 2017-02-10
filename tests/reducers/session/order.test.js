import { expect } from 'chai';
import { orderStub } from '../../config/stubs';
import { RESOLVE_ORDER } from 'actions/session/order';
import reducer from 'reducers/session/order';

const initialState = {};
const payload = orderStub;

describe('reducers/session/order', () => {
  it('should return the initial state', () => {
    expect(
      reducer(initialState, {})
    ).to.equal(initialState);
  });

  it('handles the RESOLVE_ORDER_FULFILLED action', () => {
    let reduced = reducer(initialState, {
      type: `${RESOLVE_ORDER}_FULFILLED`,
      payload,
    });
    expect(reduced).to.deep.equal(payload);
  });
});
