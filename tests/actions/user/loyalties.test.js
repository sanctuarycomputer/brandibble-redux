/* global describe afterEach before beforeEach it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { authenticateUser } from 'actions/session/user';
import {
  FETCH_CUSTOMER_LOYALTIES,
  fetchLoyalties
} from 'actions/user/loyalties';
import { brandibble, cardStub, validCredentialsStub } from '../../config/stubs';

const mockStore = configureStore(reduxMiddleware);

describe('actions/user/loyalties', () => {
  let store, actionsCalled, first, last, customerId;

  before(() => {
    store = mockStore();
    return authenticateUser(brandibble, validCredentialsStub)(store.dispatch).then((res) => {
      customerId = res.value.customer_id;
      store.clearActions();
    });
  });

  describe('fetchLoyalties', () => {
    before(() => {
      store = mockStore();
      return fetchLoyalties(brandibble, customerId)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        [first, last] = actionsCalled;
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('first action should be FETCH_CUSTOMER_LOYALTIES_PENDING', () => {
      expect(first).to.have.property('type', 'FETCH_CUSTOMER_LOYALTIES_PENDING');
    });

    it('last action should be FETCH_CUSTOMER_LOYALTIES_FULFILLED', () => {
      expect(last).to.have.property('type', 'FETCH_CUSTOMER_LOYALTIES_FULFILLED');
    });
  });
});
