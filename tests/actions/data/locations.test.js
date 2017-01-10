import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { fetchLocations } from 'actions/data/locations';
import { brandibble } from '../../config/stubs';

const mockStore = configureStore(reduxMiddleware);

describe('actions/data/locations', () => {
  let store, actionsCalled, first, last;
  describe('fetchLocations', () => {
    before(() => {
      store = mockStore();
      return fetchLocations(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        [first, last] = actionsCalled;
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('first action should be LOCATIONS_FETCH_START', () => {
      expect(first).to.have.property('type', 'LOCATIONS_FETCH_START');
    });

    it('last action should be LOCATIONS_FETCH_SUCCESS', () => {
      expect(last).to.have.property('type', 'LOCATIONS_FETCH_SUCCESS');
    });
  });
});
