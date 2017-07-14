/* global describe afterEach before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { authenticateUser } from 'actions/session/user';
import { fetchPastCustomerOrders } from 'actions/session/customerOrders';
import {
  createRating,
  deleteRating,
  fetchRating,
  updateRating,
} from 'actions/session/ratings';
import { brandibble, validCredentialsStub } from '../../config/stubs';

const mockStore = configureStore(reduxMiddleware);

describe('actions/session/ratings', () => {
  let action;
  let actionsCalled;
  let orders_id;
  let store;
  before(() => {
    store = mockStore();
    return authenticateUser(brandibble, validCredentialsStub)(store.dispatch).then((authResponse) => {
      const { customer_id } = authResponse.value;
      return fetchPastCustomerOrders(brandibble, customer_id)(store.dispatch).then((fetchResponse) => {
        orders_id = fetchResponse.value.data[0].orders_id;
        store.clearActions();
      });
    });
  });

  afterEach(() => store.clearActions());

  describe('createRating', () => {
    describe('calls actions', () => {
      before(() => {
        return createRating(brandibble, orders_id, { rating: 3 })(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call at least 2 actions', () => {
        expect(actionsCalled).to.have.length.of.at.least(2);
      });

      it('should have RATINGS_CREATE_START action', () => {
        action = find(actionsCalled, { type: 'RATINGS_CREATE_START' });
        expect(action).to.exist;
      });

      it('should have RATINGS_CREATE_SUCCESS action', () => {
        action = find(actionsCalled, { type: 'RATINGS_CREATE_SUCCESS' });
        expect(action).to.exist;
      });

      describe('fetchRating', () => {
        describe('calls actions', () => {
          before(() => {
            return fetchRating(brandibble, orders_id)(store.dispatch).then(() => {
              actionsCalled = store.getActions();
            });
          });

          it('should call at least 2 actions', () => {
            expect(actionsCalled).to.have.length.of.at.least(2);
          });

          it('should have RATINGS_FETCH_START action', () => {
            action = find(actionsCalled, { type: 'RATINGS_FETCH_START' });
            expect(action).to.exist;
          });

          it('should have RATINGS_FETCH_SUCCESS action', () => {
            action = find(actionsCalled, { type: 'RATINGS_FETCH_SUCCESS' });
            expect(action).to.exist;
          });
        });
      });

      describe('updateRating', () => {
        describe('calls actions', () => {
          before(() => {
            return updateRating(brandibble, orders_id, { rating: 5, comments: 'so friggin good' })(store.dispatch).then(() => {
              actionsCalled = store.getActions();
            });
          });

          it('should call at least 2 actions', () => {
            expect(actionsCalled).to.have.length.of.at.least(2);
          });

          it('should have RATINGS_UPDATE_START action', () => {
            action = find(actionsCalled, { type: 'RATINGS_UPDATE_START' });
            expect(action).to.exist;
          });

          it('should have RATINGS_UPDATE_SUCCESS action', () => {
            action = find(actionsCalled, { type: 'RATINGS_UPDATE_SUCCESS' });
            expect(action).to.exist;
          });
        });
      });

      describe('deleteRating', () => {
        describe('calls actions', () => {
          before(() => {
            return deleteRating(brandibble, orders_id)(store.dispatch).then(() => {
              actionsCalled = store.getActions();
            });
          });

          it('should call at least 2 actions', () => {
            expect(actionsCalled).to.have.length.of.at.least(2);
          });

          it('should have RATINGS_DELETE_START action', () => {
            action = find(actionsCalled, { type: 'RATINGS_DELETE_START' });
            expect(action).to.exist;
          });

          it('should have RATINGS_DELETE_SUCCESS action', () => {
            action = find(actionsCalled, { type: 'RATINGS_DELETE_SUCCESS' });
            expect(action).to.exist;
          });
        });
      });
    });
  });
});
