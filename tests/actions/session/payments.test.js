/* global describe afterEach before beforeEach it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { fetchPayments, createPayment, deletePayment } from 'actions/session/payments';
import { authenticateUser } from 'actions/session/user';
import { brandibble, cardStub, validCredentialsStub } from '../../config/stubs';

import {
  FETCH_PAYMENTS,
  CREATE_PAYMENT,
  DELETE_PAYMENT,
  SET_DEFAULT_PAYMENT,
  fetchPayments,
  createPayment,
  deletePayment,
  setDefaultPayment,
} from 'actions/session/payments';

const mockStore = configureStore(reduxMiddleware);

describe('actions/session/payments', () => {
  let action, actionsCalled, store;

  before(() => {
    store = mockStore();
    return authenticateUser(brandibble, validCredentialsStub)(store.dispatch).then(() => {
      store.clearActions();
    });
  });

  afterEach(() => store.clearActions());

  describe('fetchPayments', () => {
    before(() => {
      store = mockStore();
      return fetchPayments(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have FETCH_PAYMENTS_PENDING action', () => {
      action = find(actionsCalled, { type: `${FETCH_PAYMENTS}_PENDING` });
      expect(action).to.exist;
    });

    it('should have FETCH_PAYMENTS_FULFILLED action', () => {
      action = find(actionsCalled, { type: `${FETCH_PAYMENTS}_FULFILLED` });
      expect(action).to.exist;
    });
  });
  describe('createPayment', () => {
    let id;

    before(() => {
      return createPayment(brandibble, cardStub)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        action = find(actionsCalled, { type: `${CREATE_PAYMENT}_FULFILLED` });
        id = action.payload[0].customer_card_id;
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have CREATE_PAYMENT_PENDING action', () => {
      action = find(actionsCalled, { type: `${CREATE_PAYMENT}_PENDING` });
      expect(action).to.exist;
    });

    it('should have CREATE_PAYMENT_FULFILLED action', () => {
      action = find(actionsCalled, { type: `${CREATE_PAYMENT}_FULFILLED` });
      expect(action).to.exist;
    });

    // default
    describe('setDefaultPayment', () => {
      before(() => {
        store.clearActions();
        return setDefaultPayment(brandibble, id)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

      it('should have SET_DEFAULT_PAYMENT_PENDING action', () => {
        action = find(actionsCalled, { type: `${SET_DEFAULT_PAYMENT}_PENDING` });
        expect(action).to.exist;
      });

      it('should have SET_DEFAULT_PAYMENT_FULFILLED action', () => {
        action = find(actionsCalled, { type: `${SET_DEFAULT_PAYMENT}_FULFILLED` });
        expect(action).to.exist;
      });
    });

    // delete
    describe('deletePayment', () => {
      before(() => {
        store.clearActions();
        return deletePayment(brandibble, id)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

      it('should have DELETE_PAYMENT_PENDING action', () => {
        action = find(actionsCalled, { type: `${DELETE_PAYMENT}_PENDING` });
        expect(action).to.exist;
      });

      it('should have DELETE_PAYMENT_FULFILLED action', () => {
        action = find(actionsCalled, { type: `${DELETE_PAYMENT}_FULFILLED` });
        expect(action).to.exist;
      });
    });

  });
});
