import { expect } from 'chai';
import reduxCrud from 'redux-crud';
import reducer from 'reducers/data/locations';
import { locationsStub } from '../../config/stubs';

const { LOCATIONS_FETCH_SUCCESS } = reduxCrud.actionTypesFor('locations');
const initialState = [];
const payload = locationsStub;

describe('reducers/data/locations', () => {
  it('should return the initial state', () => {
    expect(
      reducer(initialState, {})
    ).to.equal(initialState);
  });

  it('handles the LOCATIONS_FETCH_SUCCESS action', () => {
    let reduced = reducer(initialState, {
      type: LOCATIONS_FETCH_SUCCESS,
      records: payload,
    });
    expect(reduced[0].id).to.equal(payload[0].id);
  });
});
