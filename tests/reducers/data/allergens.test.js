/* global describe it */
import { expect } from 'chai';
import { FETCH_ALLERGENS } from 'actions/data/allergens';
import reducer, { initialState } from 'reducers/data/allergens';

describe('reducers/data/allergens', () => {
  it('should return the initial state', () => {
    const reduced = reducer(initialState, {});
    expect(reduced).to.equal(initialState);
  });

  it('handles the ALLERGENS_FETCH_SUCCESS action', () => {
    const payload = [{ id: 1, name: 'bird flu' }];
    const reduced = reducer(initialState, {
      type: `${FETCH_ALLERGENS}_FULFILLED`,
      payload,
    });
    expect(reduced.allergensById[payload[0].id]).to.exist;
  });
});
