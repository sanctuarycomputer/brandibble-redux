/* global describe before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import {
  PUSH_GEOLOCATION,
  FETCH_LOCATION,
  FETCH_LOCATIONS,
  pushGeolocation,
  fetchLocation,
  fetchLocations,
} from 'actions/data/locations';
import { brandibble } from '../../config/stubs';

const mockStore = configureStore(reduxMiddleware);

describe('actions/data/locations', () => {
  let store, actionsCalled, data, action;

  before(() => {
    store = mockStore();
    return fetchLocations(brandibble)(store.dispatch).then((response) => {
      data = response.value;
      actionsCalled = store.getActions();
    });
  });

  describe('fetchLocations', () => {
    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it(`first action should be ${FETCH_LOCATIONS}_PENDING`, () => {
      action = find(actionsCalled, { type: `${FETCH_LOCATIONS}_PENDING` });
      expect(action).to.exist;
    });

    it(`last action should be ${FETCH_LOCATIONS}_FULFILLED`, () => {
      action = find(actionsCalled, { type: `${FETCH_LOCATIONS}_FULFILLED` });
      expect(action).to.exist;
    });
  });

  describe('pushGeolocation', () => {
    before(() => {
      store.clearActions();
      pushGeolocation(data[0])(store.dispatch);
      actionsCalled = store.getActions();
    });

    it('should call 1 action', () => expect(actionsCalled).to.have.length.of(1));

    it(`action should be ${PUSH_GEOLOCATION}`, () => {
      action = find(actionsCalled, { type: PUSH_GEOLOCATION });
      expect(action).to.exist;
    });
  });

  describe('fetchLocation', () => {
    before(() => {
      store.clearActions();
      return fetchLocation(brandibble, data[0].location_id)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it(`first action should be ${FETCH_LOCATION}_PENDING`, () => {
      action = find(actionsCalled, { type: `${FETCH_LOCATION}_PENDING` });
      expect(action).to.exist;
    });

    it(`last action should be ${FETCH_LOCATION}_FULFILLED`, () => {
      action = find(actionsCalled, { type: `${FETCH_LOCATION}_FULFILLED` });
      expect(action).to.exist;
    });
  });
});
