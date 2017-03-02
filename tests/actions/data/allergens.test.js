/* global describe before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { fetchAllergens } from 'actions/data/allergens';
import reduxMiddleware from 'config/middleware';
import { brandibble } from '../../config/stubs';

const mockStore = configureStore(reduxMiddleware);

describe('actions/data/allergens', () => {
  let store, actionsCalled;
  describe('fetchAllergens', () => {
    before(() => {
      store = mockStore();
      return fetchAllergens(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));
  });
});
