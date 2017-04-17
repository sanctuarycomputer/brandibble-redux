/* global describe afterEach before beforeEach it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { fetchMenu } from 'actions/session/menus';
import {
  setOrderAddress,
  setOrderLocationId,
  setPaymentMethod,
  resolveOrder,
  addLineItem,
  bindCustomerToOrder,
  removeLineItem,
  setLineItemQuantity,
  submitOrder,
  addOptionToLineItem,
  removeOptionFromLineItem,
  setPromoCode,
  setRequestedAt,
  validateCurrentOrder,
} from 'actions/session/order';
import {
  addressStub,
  authResponseStub,
  brandibble,
  cardStub,
  makeUnpersistedOrder,
  productStub,
  SAMPLE_MENU_LOCATION_ID,
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

  describe('setPromoCode', () => {
    before(() => {
      store = mockStore();
      return setPromoCode(makeUnpersistedOrder(), 'freedig')(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should have SET_PROMO_CODE_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_PROMO_CODE_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'SET_PROMO_CODE_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });

  describe('setRequestedAt', () => {
    before(() => {
      store = mockStore();
      return setRequestedAt(makeUnpersistedOrder(), '2017-03-22T17:50:29Z')(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should have SET_REQUESTED_AT_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });

  describe('validateCurrentOrder', () => {
    before(() => {
      store = mockStore();
      const order = makeUnpersistedOrder();

      return fetchMenu(brandibble, SAMPLE_MENU_LOCATION_ID)(store.dispatch).then(({ menu }) => {
        const product = menu[0].children[menu[0].children.length - 1].items[0];
        order.cart.addLineItem(product, product.id);

        return setOrderLocationId(order, SAMPLE_MENU_LOCATION_ID)(store.dispatch).then(() => {
          return setOrderAddress(order, addressStub)(store.dispatch).then(() => {
            return bindCustomerToOrder(order, authResponseStub)(store.dispatch).then(() => {
              return setPaymentMethod(order, 'credit', cardStub)(store.dispatch).then(() => {
                store.clearActions();
                return validateCurrentOrder(brandibble)(store.dispatch).then(() => {
                  actionsCalled = store.getActions();
                });
              });
            });
          });
        });
      });
    });

    it('should have VALIDATE_CURRENT_ORDER_PENDING action', () => {
      action = find(actionsCalled, { type: 'VALIDATE_CURRENT_ORDER_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'VALIDATE_CURRENT_ORDER_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });

  describe('validateCurrentOrder', () => {
    before(() => {
      store = mockStore();
      const order = makeUnpersistedOrder();

      return fetchMenu(brandibble, SAMPLE_MENU_LOCATION_ID)(store.dispatch).then(({ menu }) => {
        const product = menu[0].children[menu[0].children.length - 1].items[0];
        order.cart.addLineItem(product, product.id);

        return setOrderLocationId(order, SAMPLE_MENU_LOCATION_ID)(store.dispatch).then(() => {
          return setOrderAddress(order, addressStub)(store.dispatch).then(() => {
            return bindCustomerToOrder(order, authResponseStub)(store.dispatch).then(() => {
              return setPaymentMethod(order, 'credit', cardStub)(store.dispatch).then(() => {
                store.clearActions();
                return validateCurrentOrder(brandibble)(store.dispatch).then(() => {
                  actionsCalled = store.getActions();
                });
              });
            });
          });
        });
      });
    });

    it('should have VALIDATE_CURRENT_ORDER_PENDING action', () => {
      action = find(actionsCalled, { type: 'VALIDATE_CURRENT_ORDER_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'VALIDATE_CURRENT_ORDER_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });

  describe('setOrderAddress', () => {
    before(() => {
      store = mockStore();
      return setOrderAddress(makeUnpersistedOrder(), addressStub)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have SET_ORDER_ADDRESS_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_ORDER_ADDRESS_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'SET_ORDER_ADDRESS_FULFILLED' });
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

  describe('submitOrder', () => {
    before(() => {
      store = mockStore();
      const order = makeUnpersistedOrder();

      return fetchMenu(brandibble, SAMPLE_MENU_LOCATION_ID)(store.dispatch).then(({ menu }) => {
        const product = menu[0].children[menu[0].children.length - 1].items[0];
        order.cart.addLineItem(product, product.id);

        return setOrderLocationId(order, SAMPLE_MENU_LOCATION_ID)(store.dispatch).then(() => {
          return setOrderAddress(order, addressStub)(store.dispatch).then(() => {
            return bindCustomerToOrder(order, authResponseStub)(store.dispatch).then(() => {
              return setPaymentMethod(order, 'credit', cardStub)(store.dispatch).then(() => {
                // hack to reset any previously set promo codes
                return setPromoCode(makeUnpersistedOrder(), '')(store.dispatch).then(() => {
                  store.clearActions();

                  return submitOrder(brandibble, order)(store.dispatch).then(() => {
                    actionsCalled = store.getActions();
                  });
                });
              });
            });
          });
        });
      });
    });

    it('should call 2 actions', () => expect(actionsCalled).to.have.length.of(2));

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'SUBMIT_ORDER_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });
});
