/* global describe it */
import { expect } from 'chai';
import {
  FETCH_LEVELUP_LOYALTY,
  FETCH_LEVELUP_QR_CODE,
  FETCH_LEVELUP_PAYMENT_METHOD,
  FETCH_LEVELUP_CAMPAIGN,
} from 'actions/session/user';
import reducer from 'reducers/user/levelup';

const initialState = {
  loyalty: {},
  qr_code: null,
  payment_method: null,
  campaignsById: {},
};

describe('reducers/user/levelup', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.deep.equal(initialState);
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

  it('handles the FETCH_LEVELUP_CAMPAIGN_FULFILLED action', () => {
    const payload = { campaign: '69', meta: { campaignId: '7', campaignType: 'basic_v1' }};
    const reduced = reducer(initialState, {
      type: `${FETCH_LEVELUP_CAMPAIGN}_FULFILLED`,
      payload,
    });
    expect(reduced.campaignsById).to.deep.equal({
      '7-basic_v1': '69'
    });
  });

  it('handles the FETCH_LEVELUP_PAYMENT_METHOD_FULFILLED action', () => {
    const payload = { description: 'Visa 1234' };
    const reduced = reducer(initialState, {
      type: `${FETCH_LEVELUP_PAYMENT_METHOD}_FULFILLED`,
      payload,
    });
    expect(reduced.payment_method).to.equal(payload);
  });
});
