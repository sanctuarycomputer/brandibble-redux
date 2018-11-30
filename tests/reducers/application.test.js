/* global describe it before */
import { expect } from 'chai';
import { createStore } from 'redux';
import rootReducer from 'reducers';
import { FETCH_GEOLOCATIONS } from 'actions/data/geolocations';
import { FETCH_MENU } from 'actions/session/menus';
import { VALIDATE_USER } from 'actions/session/user';
import { RESET_APPLICATION } from 'actions/application';
import { locationsStub, menusStub, menuMetaStub, customersValidateStub } from '../config/stubs';

const store = createStore(rootReducer);
const initialState = store.getState();

describe('application reducers', () => {
  before(() => {
    store.dispatch({
      type: `${FETCH_GEOLOCATIONS}_FULFILLED`,
      payload: locationsStub,
    });
    store.dispatch({
      type: `${FETCH_MENU}_FULFILLED`,
      payload: menusStub,
      meta: menuMetaStub,
    });
    store.dispatch({
      type: `${VALIDATE_USER}_FULFILLED`,
      payload: customersValidateStub,
    });

    expect(store.getState()).to.not.deep.equal(initialState);
  });

  it('should reset the entire application state on RESET_APPLICATION_FULFILLED', () => {
    store.dispatch({
      type: `${RESET_APPLICATION}_FULFILLED`,
    });

    expect(store.getState()).to.deep.equal(initialState);
  });
});
