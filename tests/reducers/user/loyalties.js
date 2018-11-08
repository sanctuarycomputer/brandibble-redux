/* global describe it */
import { expect } from 'chai';
import reducer from 'reducers/user/loyalties';

import {
  FETCH_CUSTOMER_LOYALTIES,
  fetchLoyalties
} from 'actions/user/loyalties';

export const initialState = {
  loyalties: {},
};

describe('reducers/user/loyalties', () => {
  it('handles the FETCH_CUSTOMER_LOYALTIES action', () => {
    const reduced = reducer(initialState, {
      type: `${FETCH_CUSTOMER_CATERING_REWARDS}_FULFILLED`,
      payload,
    });

    expect(reduced.all).to.equal(initialState.all);
    expect(reduced.past).to.equal(initialState.past);
    expect(reduced.upcoming[0]).to.equal(payload[0]);
  });
});
