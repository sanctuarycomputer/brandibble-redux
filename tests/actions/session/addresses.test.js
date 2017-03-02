/* global describe afterEach before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import reduxCrud from 'redux-crud';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { createAddress, deleteAddress, fetchAddresses } from 'actions/session/addresses';
import { authenticateUser } from 'actions/session/user';
import { brandibble, addressStub, validCredentialsStub } from '../../config/stubs';

const {
  ADDRESSES_CREATE_START,
  ADDRESSES_CREATE_SUCCESS,
  ADDRESSES_DELETE_START,
  ADDRESSES_DELETE_SUCCESS,
  ADDRESSES_FETCH_START,
  ADDRESSES_FETCH_SUCCESS,
} = reduxCrud.actionTypesFor('addresses');
const mockStore = configureStore(reduxMiddleware);

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

    it('should have ADDRESSES_FETCH_START action', () => {
      action = find(actionsCalled, { type: ADDRESSES_FETCH_START });
      expect(action).to.exist;
    });

    it('should have ADDRESSES_FETCH_SUCCESS action', () => {
      action = find(actionsCalled, { type: ADDRESSES_FETCH_SUCCESS });
      expect(action).to.exist;
    });
  });

  describe('createAddress', () => {
    let action, actionsCalled, id;

    before(() => {
      return createAddress(brandibble, addressStub)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        action = find(actionsCalled, { type: ADDRESSES_CREATE_SUCCESS });
        id = action.record.customer_address_id;
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have ADDRESSES_CREATE_START action', () => {
      action = find(actionsCalled, { type: ADDRESSES_CREATE_START });
      expect(action).to.exist;
    });

    it('should have ADDRESSES_CREATE_SUCCESS action', () => {
      action = find(actionsCalled, { type: ADDRESSES_CREATE_SUCCESS });
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

      it('should have ADDRESSES_DELETE_START action', () => {
        action = find(actionsCalled, { type: ADDRESSES_DELETE_START });
        expect(action).to.exist;
      });

      it('should have ADDRESSES_DELETE_SUCCESS action', () => {
        action = find(actionsCalled, { type: ADDRESSES_DELETE_SUCCESS });
        expect(action).to.exist;
      });
    });
  });
});
