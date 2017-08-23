/* global describe it */
import { expect } from 'chai';
import { PUSH_GEOLOCATION, FETCH_LOCATIONS, FETCH_LOCATION } from 'actions/data/locations';
import { RESOLVE_ORDER_LOCATION } from 'actions/session/order';
import reducer, { initialState } from 'reducers/data/locations';
import { locationsStub } from '../../config/stubs';

const payload = locationsStub;

describe('reducers/data/locations', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the PUSH_GEOLOCATION action', () => {
    const reduced = reducer(initialState, {
      type: PUSH_GEOLOCATION,
      payload: payload[0],
    });
    expect(reduced.locationsById[payload[0].location_id]).to.exist;
  });

  it('handles the FETCH_LOCATION_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${FETCH_LOCATION}_FULFILLED`,
      payload: payload[0],
    });
    expect(reduced.locationsById[payload[0].location_id]).to.exist;
  });

  it('handles the RESOLVE_LOCATION_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${RESOLVE_ORDER_LOCATION}_FULFILLED`,
      payload: payload[0],
    });
    expect(reduced.locationsById[payload[0].location_id]).to.exist;
  });

  it('handles the RESOLVE_LOCATION_FULFILLED action as null payload', () => {
    const reduced = reducer(initialState, {
      type: `${RESOLVE_ORDER_LOCATION}_FULFILLED`,
      payload: null,
    });
    expect(reduced).to.equal(initialState);
  });


  it('handles the FETCH_LOCATIONS_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${FETCH_LOCATIONS}_FULFILLED`,
      payload,
    });
    expect(reduced.locationsById[payload[0].location_id]).to.exist;
  });
});
