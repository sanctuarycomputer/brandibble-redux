import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { brandibble, makeUnpersistedOrder, productStub } from '../../config/stubs';
import {
  setOrderLocationId,
  resolveOrder,
  addLineItem,
  removeLineItem,
  setLineItemQuantity,
  addOptionToLineItem,
  removeOptionFromLineItem
} from 'actions/session/order';

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
      action = find(actionsCalled, { type: 'RESOLVE_ORDER_FULFILLED' });
      expect(action).to.have.property('payload');
      expect(action.payload).to.have.property('order').is.not.undefined.and.is.not.null;
    });
  });

  describe('setOrderLocationId', () => {
    before(done => {
      store = mockStore();
      setOrderLocationId(makeUnpersistedOrder(), 19)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        done();
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('should have SET_ORDER_LOCATION_ID_PENDING action', () => {
      action = find(actionsCalled, {type: 'SET_ORDER_LOCATION_ID_PENDING'});
      expect(action).to.exist;
    });

    it('should have a payload', () => {
       action = find(actionsCalled, {type: 'SET_ORDER_LOCATION_ID_FULFILLED'});
       expect(action).to.have.a.property('payload');
     });
  });

  describe('addLineItem', () => {
    before(done => {
      store = mockStore();
      addLineItem(makeUnpersistedOrder(), productStub, 1)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        done();
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('should have ADD_LINE_ITEM_PENDING action', () => {
      action = find(actionsCalled, {type: 'ADD_LINE_ITEM_PENDING'});
      expect(action).to.exist;
    });

    it('should have ADD_LINE_ITEM_FULFILLED action', () => {
      action = find(actionsCalled, {type: 'ADD_LINE_ITEM_FULFILLED'});
      expect(action).to.exist;
    });

    it('should throw when no location id', () => {
      let order = makeUnpersistedOrder();
      order.locationId = null;
      expect(function() {
        addLineItem(order, productStub, 1)(store.dispatch);
      }).to.throw
    });
  });

  describe('removeLineItem', () => {
    before(done => {
      store = mockStore();
      let order = makeUnpersistedOrder();
      let lineItem = order.cart.addLineItem(productStub, 1);
      let optionGroup = productStub.option_groups[0];
      let optionItem = optionGroup.option_items[0];
      order.cart.addOptionToLineItem(lineItem, optionGroup, optionItem)
      removeLineItem(order, lineItem)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        done();
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('should have REMOVE_LINE_ITEM_PENDING action', () => {
      action = find(actionsCalled, {type: 'REMOVE_LINE_ITEM_PENDING'});
      expect(action).to.exist;
    });

    it('should have REMOVE_LINE_ITEM_FULFILLED action', () => {
      action = find(actionsCalled, {type: 'REMOVE_LINE_ITEM_FULFILLED'});
      expect(action).to.exist;
    });
  });

  describe('addOptionToLineItem', () => {
    before(done => {
      store = mockStore();
      let order = makeUnpersistedOrder();
      let lineItem = order.cart.addLineItem(productStub, 1);
      let optionGroup = productStub.option_groups[0];
      let optionItem = optionGroup.option_items[0];
      addOptionToLineItem(order, lineItem, optionGroup, optionItem)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        done();
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('should have ADD_OPTION_TO_LINE_ITEM_PENDING action', () => {
      action = find(actionsCalled, {type: 'ADD_OPTION_TO_LINE_ITEM_PENDING'});
      expect(action).to.exist;
    });

    it('should have ADD_OPTION_TO_LINE_ITEM_FULFILLED action', () => {
      action = find(actionsCalled, {type: 'ADD_OPTION_TO_LINE_ITEM_FULFILLED'});
      expect(action).to.exist;
    });
  });

  describe('removeOptionFromLineItem', () => {
    before(done => {
      store = mockStore();
      let order = makeUnpersistedOrder();
      let lineItem = order.cart.addLineItem(productStub, 1);
      let optionGroup = productStub.option_groups[0];
      let optionItem = optionGroup.option_items[0];
      order.cart.addOptionToLineItem(lineItem, optionGroup, optionItem)
      removeOptionFromLineItem(order, lineItem, optionItem)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        done();
      });
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('should have REMOVE_OPTION_FROM_LINE_ITEM_PENDING action', () => {
      action = find(actionsCalled, {type: 'REMOVE_OPTION_FROM_LINE_ITEM_PENDING'});
      expect(action).to.exist;
    });

    it('should have REMOVE_OPTION_FROM_LINE_ITEM_FULFILLED action', () => {
      action = find(actionsCalled, {type: 'REMOVE_OPTION_FROM_LINE_ITEM_FULFILLED'});
      expect(action).to.exist;
    });
  });

  describe('setLineItemQuantity', () => {
    before(done => {
      store = mockStore();
      let order = makeUnpersistedOrder();
      let lineItem = order.cart.addLineItem(productStub, 1);
      setLineItemQuantity(order, lineItem, 10)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
        done();
      });
    });

    it('throws with a < 1 quantity', () => {
      let order = makeUnpersistedOrder();
      let lineItem = order.cart.addLineItem(productStub, 1);
      expect(function() {
        setLineItemQuantity(order, lineItem, 0)(store.dispatch);
      }).to.throw
    });

    it('should call 2 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('should have SET_LINE_ITEM_QUANTITY_PENDING action', () => {
      action = find(actionsCalled, {type: 'SET_LINE_ITEM_QUANTITY_PENDING'});
      expect(action).to.exist;
    });

    it('should have SET_LINE_ITEM_QUANTITY_FULFILLED action', () => {
      action = find(actionsCalled, {type: 'SET_LINE_ITEM_QUANTITY_FULFILLED'});
      expect(action).to.exist;
    });
  });
});
