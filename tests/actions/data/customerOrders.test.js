import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import {
  fetchAllCustomerOrders,
  fetchPastCustomerOrders,
  fetchUpcomingCustomerOrders,
} from 'actions/data/customerOrders';
import { brandibble, validCredentialsStub } from '../../config/stubs';
import { authenticateUser } from 'actions/session/user';

const mockStore = configureStore(reduxMiddleware);

describe('actions/data/customerOrders', () => {
  let store, actionsCalled, first, last, customerId;

  before(done => {
    store = mockStore();
    authenticateUser(brandibble, validCredentialsStub)(store.dispatch).then(res => {
      customerId = res.value.customer_id;
      store.clearActions();
      done();
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchAllCustomerOrders', () => {
    before(() => {
      store = mockStore();
      return fetchAllCustomerOrders(brandibble, customerId)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        [first, last] = actionsCalled;
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('first action should be FETCH_ALL_CUSTOMER_ORDERS_PENDING', () => {
      expect(first).to.have.property('type', 'FETCH_ALL_CUSTOMER_ORDERS_PENDING');
    });

    it('last action should be FETCH_ALL_CUSTOMER_ORDERS_FULFILLED', () => {
      expect(last).to.have.property('type', 'FETCH_ALL_CUSTOMER_ORDERS_FULFILLED');
    });
  });

  describe('fetchPastCustomerOrders', () => {
    before(() => {
      store = mockStore();
      return fetchPastCustomerOrders(brandibble, customerId)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        [first, last] = actionsCalled;
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('first action should be FETCH_PAST_CUSTOMER_ORDERS_PENDING', () => {
      expect(first).to.have.property('type', 'FETCH_PAST_CUSTOMER_ORDERS_PENDING');
    });

    it('last action should be FETCH_PAST_CUSTOMER_ORDERS_FULFILLED', () => {
      expect(last).to.have.property('type', 'FETCH_PAST_CUSTOMER_ORDERS_FULFILLED');
    });
  });

  describe('fetchUpcomingCustomerOrders', () => {
    before(() => {
      store = mockStore();
      return fetchUpcomingCustomerOrders(brandibble, customerId)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        [first, last] = actionsCalled;
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('first action should be FETCH_UPCOMING_CUSTOMER_ORDERS_PENDING', () => {
      expect(first).to.have.property('type', 'FETCH_UPCOMING_CUSTOMER_ORDERS_PENDING');
    });

    it('last action should be FETCH_UPCOMING_CUSTOMER_ORDERS_FULFILLED', () => {
      expect(last).to.have.property('type', 'FETCH_UPCOMING_CUSTOMER_ORDERS_FULFILLED');
    });
  });
});
