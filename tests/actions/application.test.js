/* global describe before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import {
  sendSupportTicket,
  setupBrandibble,
  setupBrandibbleRedux,
} from 'actions/application';
import { brandibble } from '../config/stubs';

const mockStore = configureStore(reduxMiddleware);

describe('actions/application', () => {
  let store, action, actionsCalled;
  describe('setupBrandibble', () => {
    before(() => {
      store = mockStore();
      return setupBrandibble(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('brandbibble should be online', () => {
      action = find(actionsCalled, { type: 'SETUP_BRANDIBBLE_FULFILLED' });
      expect(action).to.exist;
    });
  });

  describe('setupBrandibbleRedux', () => {
    before(() => {
      store = mockStore();
      return setupBrandibbleRedux(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call at least 2 actions', () => {
      expect(actionsCalled).to.have.length.of.at.least(2);
    });

    it('should have SETUP_BRANDIBBLE_REDUX_PENDING action', () => {
      action = find(actionsCalled, { type: 'SETUP_BRANDIBBLE_REDUX_PENDING' });
      expect(action).to.exist;
    });

    it('should have SETUP_BRANDIBBLE_REDUX_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'SETUP_BRANDIBBLE_REDUX_FULFILLED' });
      expect(action).to.exist;
    });
  });

  describe('sendSupportTicket', () => {
    before(() => {
      store = mockStore();
      return sendSupportTicket(brandibble, {
        subject: 'help!',
        body: 'i need avocado!',
        email: 'dev@sanctuary.computer',
      })(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call at least 2 actions', () => {
      expect(actionsCalled).to.have.length.of.at.least(2);
    });

    it('should have SEND_SUPPORT_TICKET_PENDING action', () => {
      action = find(actionsCalled, { type: 'SEND_SUPPORT_TICKET_PENDING' });
      expect(action).to.exist;
    });

    it('should have SEND_SUPPORT_TICKET_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'SEND_SUPPORT_TICKET_FULFILLED' });
      expect(action).to.exist;
    });
  });
});
