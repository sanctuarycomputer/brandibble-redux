/* global describe it */
import { expect } from 'chai';
import reducer from 'reducers/session/menus';
import { FETCH_MENU } from 'actions/session/menus';
import { menusStub, menuMetaStub } from '../../config/stubs';

const initialState = {};
const payload = menusStub;
const meta = menuMetaStub;

describe('reducers/session/menus', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the FETCH_MENU_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${FETCH_MENU}_FULFILLED`,
      payload,
      meta,
    });
    expect(reduced[meta.menuKey]).to.equal(payload);
  });
});
