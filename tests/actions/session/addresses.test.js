/* global describe afterEach before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  FETCH_ADDRESSES,
  createAddress,
  deleteAddress,
  fetchAddresses,
} from 'actions/session/addresses';
import { authenticateUser } from 'actions/session/user';
import { brandibble, addressStub, validCredentialsStub } from '../../config/stubs';

const mockStore = configureStore(reduxMiddleware);

// don't need this when creating a new address
delete addressStub.customer_address_id;

describe('actions/session/addresses', () => {
  let store;

  before(() => {
    store = mockStore();
    return authenticateUser(brandibble, validCredentialsStub)(store.dispatch).then(() => {
      store.clearActions();
    });
  });

  afterEach(() => store.clearActions());

  describe('fetchAddresses', () => {
    let action, actionsCalled;

    before(() => {
      return fetchAddresses(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it(`should have ${FETCH_ADDRESSES}_PENDING action`, () => {
      action = find(actionsCalled, { type: `${FETCH_ADDRESSES}_PENDING` });
      expect(action).to.exist;
    });

    it(`should have ${FETCH_ADDRESSES}_FULFILLED action`, () => {
      action = find(actionsCalled, { type: `${FETCH_ADDRESSES}_FULFILLED` });
      expect(action).to.exist;
    });
  });

  describe('createAddress', () => {
    let action, actionsCalled, id;

    before(() => {
      return createAddress(brandibble, addressStub)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        action = find(actionsCalled, { type: `${CREATE_ADDRESS}_FULFILLED` });
        id = action.payload.customer_address_id;
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it(`should have ${CREATE_ADDRESS}_PENDING action`, () => {
      action = find(actionsCalled, { type: `${CREATE_ADDRESS}_PENDING` });
      expect(action).to.exist;
    });

    it(`should have ${CREATE_ADDRESS}_FULFILLED action`, () => {
      action = find(actionsCalled, { type: `${CREATE_ADDRESS}_FULFILLED` });
      expect(action).to.exist;
    });

    describe('deleteAddress', () => {
      before(() => {
        store.clearActions();
        return deleteAddress(brandibble, id)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });

      it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

      it(`should have ${DELETE_ADDRESS}_PENDING action`, () => {
        action = find(actionsCalled, { type: `${DELETE_ADDRESS}_PENDING` });
        expect(action).to.exist;
      });

      it(`should have ${DELETE_ADDRESS}_FULFILLED action`, () => {
        action = find(actionsCalled, { type: `${DELETE_ADDRESS}_FULFILLED` });
        expect(action).to.exist;
      });
    });
  });
});
