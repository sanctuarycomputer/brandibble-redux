import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { brandibble } from '../../config/stubs';
import { resolveOrder } from 'actions/session/order';

const mockStore = configureStore(reduxMiddleware);

describe('actions/session/order', () => {
  let store, action, actionsCalled;
  describe('resolveOrder', () => {
    before(done => {
      store = mockStore();
      resolveOrder(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        done();
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('should have RESOLVE_ORDER_PENDING action', () => {
      action = find(actionsCalled, {type: 'RESOLVE_ORDER_PENDING'});
      expect(action).to.exist;
    });

    it('should have RESOLVE_ORDER_FULFILLED action', () => {
      action = find(actionsCalled, {type: 'RESOLVE_ORDER_FULFILLED'});
      expect(action).to.exist;
    });
  });
});
