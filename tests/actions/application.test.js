/* global describe before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { DateTime } from 'luxon';
import { Timezones } from '../../src/utils/constants';
import {
  sendSupportTicket,
  setupBrandibble,
  setupBrandibbleRedux,
  resetApplication,
  updateInvalidOrderRequestedAt,
} from 'actions/application';
import { setOrderLocationId } from 'actions/session/order';
import {
  brandibble,
  stateWithBrandibbleRef,
  makeUnpersistedOrder,
} from '../config/stubs';
import {
  stateForOloOrderStubWithValidRequestedAt,
  stateForCateringOrderWithInvalidRequestedAt,
  stateForCateringOrderWithAsapRequestedAt,
} from '../config/stateStubs';

const { PACIFIC } = Timezones;

const mockStore = configureStore(reduxMiddleware);

describe('actions/application', () => {
  let store;
  let action;
  let actionsCalled;

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
      store = mockStore(stateWithBrandibbleRef);
      return setupBrandibbleRedux(brandibble)(
        store.dispatch,
        store.getState,
      ).then(() => {
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
      action = find(actionsCalled, {
        type: 'SETUP_BRANDIBBLE_REDUX_FULFILLED',
      });
      expect(action).to.exist;
    });
  });

  describe('updateInvalidOrderRequestedAt for olo order with a valid requested at', () => {
    before(() => {
      store = mockStore(stateForOloOrderStubWithValidRequestedAt);
      const order = makeUnpersistedOrder();

      return setOrderLocationId(order, 885)(
        store.dispatch,
        store.getState,
      ).then(() => {
        const todayAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:35:00Z', {
          zone: PACIFIC,
        });
        const requestedAtAsLuxonDateTime = DateTime.fromISO(
          '2019-02-14T20:45:00Z',
          { zone: PACIFIC },
        );
        return updateInvalidOrderRequestedAt({
          orderRef: order,
          todayAsLuxonDateTime,
          requestedAtAsLuxonDateTime,
        })(store.dispatch, store.getState);
      });
    });

    it('should not call SET_REQUESTED_AT action', () => {
      action = find(store.getActions(), { type: 'SETUP_REQUESTED_AT' });
      expect(action).to.not.exist;
    });
  });

  describe('updateInvalidOrderRequestedAt for olo order with an invalid requested at', () => {
    before(() => {
      store = mockStore(stateForOloOrderStubWithValidRequestedAt);
      const order = makeUnpersistedOrder();

      return setOrderLocationId(makeUnpersistedOrder(), 885)(
        store.dispatch,
        store.getState,
      ).then(() => {
        const todayAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:35:00Z', {
          zone: PACIFIC,
        });
        const requestedAtAsLuxonDateTime = DateTime.fromISO(
          '2019-02-14T19:00:00Z',
          { zone: PACIFIC },
        );
        return updateInvalidOrderRequestedAt({
          orderRef: order,
          todayAsLuxonDateTime,
          requestedAtAsLuxonDateTime,
        })(store.dispatch, store.getState).then(() => {
          actionsCalled = store.getActions();
        });
      });
    });

    it('should call at least 4 actions', () => {
      expect(actionsCalled).to.have.length.of.at.least(4);
    });

    it('should have SET_REQUESTED_AT_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_PENDING' });
      expect(action).to.exist;
    });

    it('should have SET_REQUESTED_AT_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_FULFILLED' });
      expect(action).to.exist;
    });

    it("should set the updated requested at to 'asap'", () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_FULFILLED' });
      expect(action.payload.order.requestedAt).to.equal('asap');
    });
  });

  describe('updateInvalidOrderRequestedAt for catering order with an invalid requested at', () => {
    before(() => {
      store = mockStore(stateForCateringOrderWithInvalidRequestedAt);
      const order = makeUnpersistedOrder();

      return setOrderLocationId(order, 886)(
        store.dispatch,
        store.getState,
      ).then(() => {
        const todayAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:35:00Z', {
          zone: PACIFIC,
        });
        const requestedAtAsLuxonDateTime = DateTime.fromISO(
          '2019-02-14T19:00:00Z',
          { zone: PACIFIC },
        );

        return updateInvalidOrderRequestedAt({
          orderRef: order,
          todayAsLuxonDateTime,
          requestedAtAsLuxonDateTime,
        })(store.dispatch, store.getState).then(() => {
          actionsCalled = store.getActions();
        });
      });
    });

    it('should call at least 4 actions', () => {
      expect(actionsCalled).to.have.length.of.at.least(4);
    });

    it('should have SET_REQUESTED_AT_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_PENDING' });
      expect(action).to.exist;
    });

    it('should have SET_REQUESTED_AT_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_FULFILLED' });
      expect(action).to.exist;
    });

    it('should set the updated requested at to a valid ISO8601 date string', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_FULFILLED' });
      const requestedAtFromISO = DateTime.fromISO(
        action.payload.order.requestedAt,
      );
      expect(requestedAtFromISO.isValid).to.be.true;
    });
  });

  describe('updateInvalidOrderRequestedAt for catering order with an ASAP requested at', () => {
    before(() => {
      store = mockStore(stateForCateringOrderWithAsapRequestedAt);
      const order = makeUnpersistedOrder();

      return setOrderLocationId(order, 886)(
        store.dispatch,
        store.getState,
      ).then(() => {
        const todayAsLuxonDateTime = DateTime.fromISO('2019-02-16T20:35:00Z', {
          zone: PACIFIC,
        });
        const requestedAtAsLuxonDateTime = DateTime.fromISO(
          '2019-02-16T19:00:00Z',
          { zone: PACIFIC },
        );

        return updateInvalidOrderRequestedAt({
          orderRef: order,
          todayAsLuxonDateTime,
          requestedAtAsLuxonDateTime,
        })(store.dispatch, store.getState).then(() => {
          actionsCalled = store.getActions();
        });
      });
    });

    it('should call at least 4 actions', () => {
      expect(actionsCalled).to.have.length.of.at.least(4);
    });

    it('should have SET_REQUESTED_AT_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_PENDING' });
      expect(action).to.exist;
    });

    it('should have SET_REQUESTED_AT_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_FULFILLED' });
      expect(action).to.exist;
    });

    it('should no longer have a requested at of asap', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_FULFILLED' });
      expect(action.payload.order.requestedAt).to.not.equal('asap');
    });

    it('should have an updated requested at as a valid ISO8601 datetime', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_FULFILLED' });
      const requestedAtFromISO = DateTime.fromISO(
        action.payload.order.requestedAt,
      );
      expect(requestedAtFromISO.isValid).to.be.true;
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

  describe('resetApplication', () => {
    before(() => {
      store = mockStore(stateWithBrandibbleRef);
      return resetApplication(brandibble)(store.dispatch, store.getState).then(
        () => {
          actionsCalled = store.getActions();
        },
      );
    });

    it('should call at least 4 actions', () => {
      expect(actionsCalled).to.have.length.of.at.least(4);
    });

    it('should have the RESET_APPLICATION_PENDING action', () => {
      action = find(actionsCalled, { type: 'RESET_APPLICATION_PENDING' });
      expect(action).to.exist;
    });

    it('should have the RESET_APPLICATION_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'RESET_APPLICATION_FULFILLED' });
      expect(action).to.exist;
    });

    it('should have SETUP_BRANDIBBLE_REDUX_PENDING action', () => {
      action = find(actionsCalled, { type: 'SETUP_BRANDIBBLE_REDUX_PENDING' });
      expect(action).to.exist;
    });

    it('should have SETUP_BRANDIBBLE_REDUX_FULFILLED action', () => {
      action = find(actionsCalled, {
        type: 'SETUP_BRANDIBBLE_REDUX_FULFILLED',
      });
      expect(action).to.exist;
    });
  });
});
