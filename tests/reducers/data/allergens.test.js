/* global describe it */
import { expect } from 'chai';
import reduxCrud from 'redux-crud';
import reducer from 'reducers/data/allergens';

const { ALLERGENS_FETCH_SUCCESS } = reduxCrud.actionTypesFor('allergens');
const initialState = [];

describe('reducers/data/allergens', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the ALLERGENS_FETCH_SUCCESS action', () => {
    const reduced = reducer(initialState, {
      type: ALLERGENS_FETCH_SUCCESS,
      records: [{ id: 1, name: 'bird flu' }],
    });
    expect(reduced);
  });
});
