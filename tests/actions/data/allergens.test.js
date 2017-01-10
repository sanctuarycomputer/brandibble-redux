import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { brandibble } from '../../config/stubs';
import { fetchAllergens } from 'actions/data/allergens';

const mockStore = configureStore(reduxMiddleware);

describe('actions/data/allergens', () => {
  let store, actionsCalled;
  describe('fetchAllergens', () => {
    before(done => {
      store = mockStore();
      fetchAllergens(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        done();
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });
  });
});
