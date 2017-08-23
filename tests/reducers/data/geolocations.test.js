/* global describe it */
import { expect } from 'chai';
import { FETCH_GEOLOCATIONS, CLEAR_GEOLOCATIONS } from 'actions/data/geolocations';
import reducer, { initialState } from 'reducers/data/geolocations';
import { locationsStub } from '../../config/stubs';

const payload = locationsStub;

describe('reducers/data/geolocations', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the FETCH_GEOLOCATIONS_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${FETCH_GEOLOCATIONS}_FULFILLED`,
      payload,
    });
    expect(reduced[0].location_id).to.eq(payload[0].location_id);
  });

  it('handles the CLEAR_GEOLOCATIONS action', () => {
    const reduced = reducer(initialState, {
      type: CLEAR_GEOLOCATIONS,
      payload,
    });
    expect(reduced.length).to.eq(0);
    expect(reduced).to.equal(initialState);
  });
});
