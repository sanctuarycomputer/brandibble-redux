/* global describe afterEach before beforeEach it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import {
  setOrderLocationId,
  setPaymentMethod,
  resolveOrder,
  addLineItem,
  bindCustomerToOrder,
  removeLineItem,
  setLineItemQuantity,
  addOptionToLineItem,
  removeOptionFromLineItem,
} from 'actions/session/order';
import {
  authResponseStub,
  brandibble,
  cardStub,
  makeUnpersistedOrder,
  productStub,
} from '../../config/stubs';

const mockStore = configureStore(reduxMiddleware);

describe('actions/session/order', () => {
  let store, action, actionsCalled;
  describe('resolveOrder', () => {
    before(() => {
      store = mockStore();
      return resolveOrder(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('should have RESOLVE_ORDER_PENDING action', () => {
      action = find(actionsCalled, { type: 'RESOLVE_ORDER_PENDING' });
      expect(action).to.exist;
    });

    it('should have RESOLVE_ORDER_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'RESOLVE_ORDER_FULFILLED' });
      expect(action).to.have.property('payload');
      expect(action.payload).to.have.property('order').is.not.undefined.and.is.not.null;
    });
  });

  describe('setOrderLocationId', () => {
    before(() => {
      store = mockStore();
      return setOrderLocationId(makeUnpersistedOrder(), 19)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have SET_ORDER_LOCATION_ID_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_ORDER_LOCATION_ID_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'SET_ORDER_LOCATION_ID_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });

  describe('setPaymentMethod', () => {
    before(() => {
      store = mockStore();
      return setPaymentMethod(makeUnpersistedOrder(), 'credit', cardStub)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have SET_PAYMENT_METHOD_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'SET_PAYMENT_METHOD_FULFILLED' });
      expect(action).to.exist.and.have.property('payload').to.have.property('order');
    });
  });

  describe('addLineItem', () => {
    before(() => {
      store = mockStore();
      return addLineItem(makeUnpersistedOrder(), productStub, 1)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have ADD_LINE_ITEM_PENDING action', () => {
      action = find(actionsCalled, { type: 'ADD_LINE_ITEM_PENDING' });
      expect(action).to.exist;
    });

    it('should have ADD_LINE_ITEM_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'ADD_LINE_ITEM_FULFILLED' });
      expect(action).to.exist;
    });

    it('should throw when no location id', () => {
      const order = makeUnpersistedOrder();
      order.locationId = null;
      expect(() => {
        addLineItem(order, productStub, 1)(store.dispatch);
      }).to.throw;
    });
  });

  describe('removeLineItem', () => {
    before(() => {
      store = mockStore();
      const order = makeUnpersistedOrder();
      const lineItem = order.cart.addLineItem(productStub, 1);
      const optionGroup = productStub.option_groups[0];
      const optionItem = optionGroup.option_items[0];
      order.cart.addOptionToLineItem(lineItem, optionGroup, optionItem);
      return removeLineItem(order, lineItem)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have REMOVE_LINE_ITEM_PENDING action', () => {
      action = find(actionsCalled, { type: 'REMOVE_LINE_ITEM_PENDING' });
      expect(action).to.exist;
    });

    it('should have REMOVE_LINE_ITEM_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'REMOVE_LINE_ITEM_FULFILLED' });
      expect(action).to.exist;
    });
  });

  describe('addOptionToLineItem', () => {
    before(() => {
      store = mockStore();
      const order = makeUnpersistedOrder();
      const lineItem = order.cart.addLineItem(productStub, 1);
      const optionGroup = productStub.option_groups[0];
      const optionItem = optionGroup.option_items[0];
      return addOptionToLineItem(order, lineItem, optionGroup, optionItem)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have ADD_OPTION_TO_LINE_ITEM_PENDING action', () => {
      action = find(actionsCalled, { type: 'ADD_OPTION_TO_LINE_ITEM_PENDING' });
      expect(action).to.exist;
    });

    it('should have ADD_OPTION_TO_LINE_ITEM_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'ADD_OPTION_TO_LINE_ITEM_FULFILLED' });
      expect(action).to.exist;
    });
  });

  describe('removeOptionFromLineItem', () => {
    before(() => {
      store = mockStore();
      const order = makeUnpersistedOrder();
      const lineItem = order.cart.addLineItem(productStub, 1);
      const optionGroup = productStub.option_groups[0];
      const optionItem = optionGroup.option_items[0];
      order.cart.addOptionToLineItem(lineItem, optionGroup, optionItem);
      return removeOptionFromLineItem(order, lineItem, optionItem)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have REMOVE_OPTION_FROM_LINE_ITEM_PENDING action', () => {
      action = find(actionsCalled, { type: 'REMOVE_OPTION_FROM_LINE_ITEM_PENDING' });
      expect(action).to.exist;
    });

    it('should have REMOVE_OPTION_FROM_LINE_ITEM_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'REMOVE_OPTION_FROM_LINE_ITEM_FULFILLED' });
      expect(action).to.exist;
    });
  });

  describe('setLineItemQuantity', () => {
    before(() => {
      store = mockStore();
      const order = makeUnpersistedOrder();
      const lineItem = order.cart.addLineItem(productStub, 1);
      return setLineItemQuantity(order, lineItem, 10)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('throws with a < 1 quantity', () => {
      const order = makeUnpersistedOrder();
      const lineItem = order.cart.addLineItem(productStub, 1);
      expect(() => {
        setLineItemQuantity(order, lineItem, 0)(store.dispatch);
      }).to.throw;
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have SET_LINE_ITEM_QUANTITY_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_LINE_ITEM_QUANTITY_PENDING' });
      expect(action).to.exist;
    });

    it('should have SET_LINE_ITEM_QUANTITY_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'SET_LINE_ITEM_QUANTITY_FULFILLED' });
      expect(action).to.exist;
    });
  });

  describe('bindCustomerToOrder', () => {
    before(() => {
      store = mockStore();
      return bindCustomerToOrder(makeUnpersistedOrder(), authResponseStub)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have BIND_CUSTOMER_TO_ORDER_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'BIND_CUSTOMER_TO_ORDER_FULFILLED' });
      expect(action).to.exist;
    });
  });
});
