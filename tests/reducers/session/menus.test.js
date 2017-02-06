import { expect } from 'chai';
import reduxCrud from 'redux-crud';
import reducer from 'reducers/session/menus';
import { menusStub } from '../../config/stubs';

const { MENUS_FETCH_SUCCESS } = reduxCrud.actionTypesFor('menus');
const initialState = {};
const payload = menusStub

describe('reducers/session/menus', () => {
  it('should return the initial state', () => {
    expect(
      reducer(initialState, {})
    ).to.equal(initialState);
  });

  it('handles the MENUS_FETCH_SUCCESS action', () => {
    let reduced = reducer(initialState, {
      type: MENUS_FETCH_SUCCESS,
      records: payload,
    });
    expect(reduced[payload.id]).to.equal(payload);
  });
});
