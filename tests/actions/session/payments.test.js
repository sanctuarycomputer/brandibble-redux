/* global describe afterEach before beforeEach it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import reduxCrud from 'redux-crud';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { fetchPayments, createPayment, deletePayment } from 'actions/session/payments';
import { authenticateUser } from 'actions/session/user';
import { brandibble, cardStub, validCredentialsStub } from '../../config/stubs';

const {
  PAYMENTS_CREATE_START,
  PAYMENTS_CREATE_SUCCESS,
  PAYMENTS_DELETE_START,
  PAYMENTS_DELETE_SUCCESS,
  PAYMENTS_FETCH_START,
  PAYMENTS_FETCH_SUCCESS,
} = reduxCrud.actionTypesFor('payments');
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

    it('should have PAYMENTS_FETCH_START action', () => {
      action = find(actionsCalled, { type: PAYMENTS_FETCH_START });
      expect(action).to.exist;
    });

    it('should have PAYMENTS_FETCH_SUCCESS action', () => {
      action = find(actionsCalled, { type: PAYMENTS_FETCH_SUCCESS });
      expect(action).to.exist;
    });
  });
  describe('createPayment', () => {
    let id;

    before(() => {
      return createPayment(brandibble, cardStub)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        action = find(actionsCalled, { type: PAYMENTS_CREATE_SUCCESS });
        id = action.record.customer_card_id;
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have PAYMENTS_CREATE_START action', () => {
      action = find(actionsCalled, { type: PAYMENTS_CREATE_START });
      expect(action).to.exist;
    });

    it('should have PAYMENTS_CREATE_SUCCESS action', () => {
      action = find(actionsCalled, { type: PAYMENTS_CREATE_SUCCESS });
      expect(action).to.exist;
    });

    describe('deletePayment', () => {
      before(() => {
        store.clearActions();
        return deletePayment(brandibble, id)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

      it('should have PAYMENTS_DELETE_START action', () => {
        action = find(actionsCalled, { type: PAYMENTS_DELETE_START });
        expect(action).to.exist;
      });

      it('should have PAYMENTS_DELETE_SUCCESS action', () => {
        action = find(actionsCalled, { type: PAYMENTS_DELETE_SUCCESS });
        expect(action).to.exist;
      });
    });
  });
});
