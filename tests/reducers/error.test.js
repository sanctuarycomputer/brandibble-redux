/* global describe it */
import { expect } from 'chai';
import reducer, { initialState } from 'reducers/error';

describe('reducers/error', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });
});
