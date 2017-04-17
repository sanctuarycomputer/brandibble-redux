/* global describe it */
import { expect } from 'chai';
import { FETCH_LEVELUP_LOYALTY, FETCH_LEVELUP_QR_CODE } from 'actions/session/user';
import reducer from 'reducers/user/levelup';

const initialState = {
  loyalty: {},
  qr_code: null,
};

describe('reducers/user/levelup', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the FETCH_LEVELUP_LOYALTY_FULFILLED action', () => {
    const payload = { points: 69 };
    const reduced = reducer(initialState, {
      type: `${FETCH_LEVELUP_LOYALTY}_FULFILLED`,
      payload,
    });
    expect(reduced.loyalty).to.equal(payload);
  });

  it('handles the FETCH_LEVELUP_QR_CODE_FULFILLED action', () => {
    const payload = '69';
    const reduced = reducer(initialState, {
      type: `${FETCH_LEVELUP_QR_CODE}_FULFILLED`,
      payload,
    });
    expect(reduced.qr_code).to.equal(payload);
  });
});
