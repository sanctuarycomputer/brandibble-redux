/* global describe before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import { fetchBrand, FETCH_BRAND } from 'actions/data/brands';
import reduxMiddleware from 'config/middleware';
import { brandibble } from '../../config/stubs';

const mockStore = configureStore(reduxMiddleware);

describe('actions/data/brands', () => {
  let store, action, actionsCalled;

  describe('fetchBrand', () => {
    before(() => {
      store = mockStore();
      return fetchBrand(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it(`first action should be ${FETCH_BRAND}_PENDING`, () => {
      action = find(actionsCalled, { type: `${FETCH_BRAND}_PENDING` });
      expect(action).to.exist;
    });

    it(`last action should be ${FETCH_BRAND}_FULFILLED`, () => {
      action = find(actionsCalled, { type: `${FETCH_BRAND}_FULFILLED` });
      expect(action).to.exist;
    });
  });
});
