/* global describe before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import {
  FETCH_GEOLOCATIONS,
  fetchGeolocations,
} from 'actions/data/geolocations';
import { brandibble } from '../../config/stubs';

const mockStore = configureStore(reduxMiddleware);

describe('actions/data/geolocations', () => {
  let store, actionsCalled, data, action;

  before(() => {
    store = mockStore();
    return fetchGeolocations(brandibble, { latitude: 40.755912, longitude: -73.9709333 })(store.dispatch).then((response) => {
      data = response.value;
      actionsCalled = store.getActions();
    });
  });

  describe('fetchGeolocations', () => {
    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it(`first action should be ${FETCH_GEOLOCATIONS}_PENDING`, () => {
      action = find(actionsCalled, { type: `${FETCH_GEOLOCATIONS}_PENDING` });
      expect(action).to.exist;
    });

    it(`last action should be ${FETCH_GEOLOCATIONS}_FULFILLED`, () => {
      action = find(actionsCalled, { type: `${FETCH_GEOLOCATIONS}_FULFILLED` });
      expect(action).to.exist;
      expect(data).to.be.an.array;
    });
  });
});
