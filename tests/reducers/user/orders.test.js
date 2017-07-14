/* global describe it */
import { expect } from 'chai';
import reducer from 'reducers/user/orders';
import {
  FETCH_ALL_CUSTOMER_ORDERS,
  FETCH_PAST_CUSTOMER_ORDERS,
  FETCH_UPCOMING_CUSTOMER_ORDERS,
} from 'actions/session/customerOrders';
import { customerOrdersStub } from '../../config/stubs';

const initialState = {
  all: null,
  past: null,
  upcoming: null,
};
const payload = customerOrdersStub;

describe('reducers/user/orders', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the FETCH_ALL_CUSTOMER_ORDERS_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${FETCH_ALL_CUSTOMER_ORDERS}_FULFILLED`,
      payload,
    });

    expect(reduced.all[0]).to.equal(payload[0]);
    expect(reduced.past).to.equal(initialState.past);
    expect(reduced.upcoming).to.equal(initialState.upcoming);
  });

  it('handles the FETCH_PAST_CUSTOMER_ORDERS_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${FETCH_PAST_CUSTOMER_ORDERS}_FULFILLED`,
      payload,
    });

    expect(reduced.all).to.equal(initialState.all);
    expect(reduced.past[0]).to.equal(payload[0]);
    expect(reduced.upcoming).to.equal(initialState.upcoming);
  });

  it('handles the FETCH_UPCOMING_CUSTOMER_ORDERS_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${FETCH_UPCOMING_CUSTOMER_ORDERS}_FULFILLED`,
      payload,
    });

    expect(reduced.all).to.equal(initialState.all);
    expect(reduced.past).to.equal(initialState.past);
    expect(reduced.upcoming[0]).to.equal(payload[0]);
  });
});
