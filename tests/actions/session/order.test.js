/* global describe before it */
/* eslint one-var-declaration-per-line:1, one-var:1 */
import { expect } from 'chai';
import find from 'lodash.find';
import configureStore from 'redux-mock-store';
import reduxMiddleware from 'config/middleware';
import { fetchMenu } from 'actions/session/menus';
import { authenticateUser } from 'actions/session/user';
import {
  setOrderAddress,
  setOrderLocationId,
  setPaymentMethod,
  setTip,
  resetTip,
  resolveOrder,
  resolveOrderLocation,
  addLineItem,
  pushLineItem,
  bindCustomerToOrder,
  removeLineItem,
  setLineItemQuantity,
  setLineItemMadeFor,
  setLineItemInstructions,
  submitOrder,
  addOptionToLineItem,
  removeOptionFromLineItem,
  setPromoCode,
  setServiceType,
  setMiscOptions,
  setRequestedAt,
  validateCurrentCart,
  validateCurrentOrder,
  addAppliedDiscount,
  removeAppliedDiscount,
} from 'actions/session/order';
import {
  addressStub,
  authResponseStub,
  brandibble,
  cardStub,
  makeUnpersistedOrder,
  productStub,
  SAMPLE_MENU_LOCATION_ID,
  buildLineItem,
  validCredentialsStub,
  stateWithBrandibbleRef,
} from '../../config/stubs';
import { Asap } from 'utils/constants';
import { discoverReduxNamespace } from '../../../src/utils/getStateWithNamespace';

const getNonConfigurableMenuItem = menu =>
  menu
    .reduce((acc, section) => acc.concat(section.children), [])
    .reduce((acc, child) => acc.concat(child.items), [])
    .find(item => !item.option_groups.length);

const mockStore = configureStore(reduxMiddleware);
// don't need this when creating a new address
delete addressStub.customer_address_id;

describe('actions/session/order', () => {
  let store;
  let action;
  let actionsCalled;
  describe('resolveOrder', () => {
    before(() => {
      store = mockStore(stateWithBrandibbleRef);
      discoverReduxNamespace(store.getState, brandibble);

      return resolveOrder(brandibble)(store.dispatch, store.getState).then(
        () => {
          actionsCalled = store.getActions();
        },
      );
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
      expect(action.payload).to.have.property('order').is.not.undefined.and.is
        .not.null;
    });
  });

  describe('resolveOrder with locationId', () => {
    before(() => {
      store = mockStore(stateWithBrandibbleRef);
      return setOrderLocationId(makeUnpersistedOrder(), 19)(
        store.dispatch,
        store.getState,
      ).then(() => {
        return resolveOrder(brandibble)(store.dispatch).then(() => {
          actionsCalled = store.getActions();
        });
      });
    });

    it('should call 10 actions', () => {
      expect(actionsCalled).to.have.length.of(10);
    });

    it('should have FETCH_MENU_PENDING action', () => {
      action = find(actionsCalled, { type: 'FETCH_MENU_PENDING' });
      expect(action).to.exist;
    });

    it('should have FETCH_MENU_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'FETCH_MENU_FULFILLED' });
      expect(action).to.exist;
    });

    it('should have FETCH_LOCATION_PENDING action', () => {
      action = find(actionsCalled, { type: 'FETCH_LOCATION_PENDING' });
      expect(action).to.exist;
    });

    it('should have FETCH_LOCATION_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'FETCH_LOCATION_FULFILLED' });
      expect(action).to.exist;
    });
  });

  describe('resolveOrder with requestedAt in the past and locationId', () => {
    before(() => {
      store = mockStore(stateWithBrandibbleRef);

      return setRequestedAt(makeUnpersistedOrder(), '2017-03-22T17:50:29Z')(
        store.dispatch,
        store.getState,
      ).then((res) => {
        return setOrderLocationId(res.value.order, 19)(
          store.dispatch,
          store.getState,
        ).then(() => {
          return resolveOrder(brandibble)(store.dispatch).then(() => {
            actionsCalled = store.getActions();
          });
        });
      });
    });

    it('should call 14 actions', () => {
      expect(actionsCalled).to.have.length.of(14);
    });

    it('should have SET_REQUESTED_AT_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_PENDING' });
      expect(action).to.exist;
    });

    it('should have SET_REQUESTED_AT_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_FULFILLED' });
      expect(action).to.exist;
    });

    it('should have FETCH_MENU_PENDING action', () => {
      action = find(actionsCalled, { type: 'FETCH_MENU_PENDING' });
      expect(action).to.exist;
    });

    it('should have FETCH_MENU_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'FETCH_MENU_FULFILLED' });
      expect(action).to.exist;
    });

    it('should have FETCH_LOCATION_PENDING action', () => {
      action = find(actionsCalled, { type: 'FETCH_LOCATION_PENDING' });
      expect(action).to.exist;
    });

    it('should have FETCH_LOCATION_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'FETCH_LOCATION_FULFILLED' });
      expect(action).to.exist;
    });

    it('the updated order should have a requested_at of "asap"', () => {
      action = find(actionsCalled, { type: 'SET_REQUESTED_AT_FULFILLED' });
      expect(action.payload.order.requestedAt).to.equal(Asap);
    });
  });

  describe('resolveOrderLocation', () => {
    before(() => {
      store = mockStore();
      return resolveOrderLocation(brandibble)(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 3 actions', () => {
      expect(actionsCalled).to.have.length.of(2);
    });

    it('should have RESOLVE_ORDER_LOCATION_PENDING action', () => {
      action = find(actionsCalled, { type: 'RESOLVE_ORDER_LOCATION_PENDING' });
      expect(action).to.exist;
    });

    it('should have RESOLVE_ORDER_LOCATION_FULFILLED action', () => {
      action = find(actionsCalled, {
        type: 'RESOLVE_ORDER_LOCATION_FULFILLED',
      });
      expect(action).to.exist;
    });
  });

  describe('setOrderLocationId with new locations data not in store', () => {
    before(() => {
      store = mockStore(stateWithBrandibbleRef);
      return setOrderLocationId(makeUnpersistedOrder(), 19)(
        store.dispatch,
        store.getState,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(3));

    it('should have SET_ORDER_LOCATION_ID_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_ORDER_LOCATION_ID_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'SET_ORDER_LOCATION_ID_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });

  describe('setOrderLocationId', () => {
    before(() => {
      store = mockStore(stateWithBrandibbleRef);
      return setOrderLocationId(makeUnpersistedOrder(), 19)(
        store.dispatch,
        store.getState,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(3));

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
      return setPromoCode(makeUnpersistedOrder(), 'freedig')(
        store.dispatch,
      ).then(() => {
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

  describe('setServiceType', () => {
    before(() => {
      store = mockStore();
      return setServiceType(makeUnpersistedOrder(), 'pickup')(
        store.dispatch,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should have SET_SERVICE_TYPE_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_SERVICE_TYPE_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'SET_SERVICE_TYPE_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });

  describe('addAppliedDiscount', () => {
    before(() => {
      store = mockStore();
      return addAppliedDiscount(makeUnpersistedOrder(), { discount_id: 123 })(
        store.dispatch,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should have ADD_APPLIED_DISCOUNT_PENDING action', () => {
      action = find(actionsCalled, { type: 'ADD_APPLIED_DISCOUNT_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'ADD_APPLIED_DISCOUNT_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });

  describe('removeAppliedDiscount', () => {
    before(() => {
      store = mockStore();
      return removeAppliedDiscount(makeUnpersistedOrder(), {
        discount_id: 123,
      })(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should have REMOVE_APPLIED_DISCOUNT_PENDING action', () => {
      action = find(actionsCalled, { type: 'REMOVE_APPLIED_DISCOUNT_PENDING' });
      expect(action).to.exist;
    });
  });

  describe('setMiscOptions', () => {
    before(() => {
      store = mockStore();
      return setMiscOptions(makeUnpersistedOrder(), {
        notes_for_store: 'sup store',
      })(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should have SET_MISC_OPTIONS_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_MISC_OPTIONS_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'SET_MISC_OPTIONS_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });

  describe('setRequestedAt', () => {
    before(() => {
      store = mockStore();
      return setRequestedAt(makeUnpersistedOrder(), '2017-03-22T17:50:29Z')(
        store.dispatch,
      ).then(() => {
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

  describe('validateCurrentCart', () => {
    before(() => {
      store = mockStore(stateWithBrandibbleRef);

      const order = makeUnpersistedOrder('pickup');

      return fetchMenu(brandibble, { locationId: SAMPLE_MENU_LOCATION_ID })(
        store.dispatch,
        store.getState,
      ).then(({ value: { menu } }) => {
        const product = getNonConfigurableMenuItem(menu);
        order.cart.addLineItem(product, 1, product.id);

        return setOrderLocationId(order, SAMPLE_MENU_LOCATION_ID)(
          store.dispatch,
          store.getState,
        ).then(() => {
          return setOrderAddress(order, addressStub)(store.dispatch).then(
            () => {
              return bindCustomerToOrder(order, authResponseStub)(
                store.dispatch,
              ).then(() => {
                return setPaymentMethod(order, 'credit', cardStub)(
                  store.dispatch,
                ).then(() => {
                  store.clearActions();
                  return validateCurrentCart(brandibble)(store.dispatch).then(
                    () => {
                      actionsCalled = store.getActions();
                    },
                  );
                });
              });
            },
          );
        });
      });
    });

    it('should have VALIDATE_CURRENT_CART_PENDING action', () => {
      action = find(actionsCalled, { type: 'VALIDATE_CURRENT_CART_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'VALIDATE_CURRENT_CART_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });

  describe('validateCurrentOrder', () => {
    before(() => {
      store = mockStore(stateWithBrandibbleRef);
      const order = makeUnpersistedOrder('pickup');

      return fetchMenu(brandibble, { locationId: SAMPLE_MENU_LOCATION_ID })(
        store.dispatch,
        store.getState,
      ).then(({ value: { menu } }) => {
        const product = getNonConfigurableMenuItem(menu);
        order.cart.addLineItem(product, 1, product.id);

        return setOrderLocationId(order, SAMPLE_MENU_LOCATION_ID)(
          store.dispatch,
          store.getState,
        ).then(() => {
          return setOrderAddress(order, addressStub)(store.dispatch).then(
            () => {
              return bindCustomerToOrder(order, authResponseStub)(
                store.dispatch,
              ).then(() => {
                return setPaymentMethod(order, 'credit', cardStub)(
                  store.dispatch,
                ).then(() => {
                  // hack to reset any previously set promo codes
                  return setPromoCode(order, '')(store.dispatch).then(() => {
                    store.clearActions();
                    return validateCurrentOrder(brandibble)(
                      store.dispatch,
                    ).then(() => {
                      actionsCalled = store.getActions();
                    });
                  });
                });
              });
            },
          );
        });
      });
    });

    it('should have VALIDATE_CURRENT_ORDER_PENDING action', () => {
      action = find(actionsCalled, { type: 'VALIDATE_CURRENT_ORDER_PENDING' });
      expect(action).to.exist;
    });

    it('should have a payload', () => {
      action = find(actionsCalled, {
        type: 'VALIDATE_CURRENT_ORDER_FULFILLED',
      });
      expect(action).to.have.a.property('payload');
    });
  });

  describe('setOrderAddress', () => {
    before(() => {
      store = mockStore();
      return setOrderAddress(makeUnpersistedOrder(), addressStub)(
        store.dispatch,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

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
      return setPaymentMethod(makeUnpersistedOrder(), 'credit', cardStub)(
        store.dispatch,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

    it('should have SET_PAYMENT_METHOD_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'SET_PAYMENT_METHOD_FULFILLED' });
      expect(action)
        .to.exist.and.have.property('payload')
        .to.have.property('order');
    });
  });

  describe('setTip', () => {
    before(() => {
      store = mockStore();
      return setTip(makeUnpersistedOrder(), 'credit', 2.5)(store.dispatch).then(
        () => {
          actionsCalled = store.getActions();
        },
      );
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

    it('should have SET_TIP_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'SET_TIP_FULFILLED' });
      expect(action.payload.order)
        .to.exist.and.have.property('miscOptions')
        .to.have.property('tip');
    });
  });

  describe('resetTip', () => {
    before(() => {
      store = mockStore();
      return resetTip(makeUnpersistedOrder())(store.dispatch).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

    it('should have RESET_TIP_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'RESET_TIP_FULFILLED' });
      expect(action.payload.order)
        .to.exist.and.have.property('miscOptions')
        .to.have.property('tip');
      expect(action.payload.order.miscOptions.tip).to.equal(null);
    });
  });

  describe('addLineItem', () => {
    before(() => {
      store = mockStore();
      return addLineItem(makeUnpersistedOrder(), productStub, 1)(
        store.dispatch,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

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

  describe('pushLineItem', () => {
    before(() => {
      store = mockStore();
      return pushLineItem(makeUnpersistedOrder(), buildLineItem())(
        store.dispatch,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

    it('should have PUSH_LINE_ITEM_PENDING action', () => {
      action = find(actionsCalled, { type: 'PUSH_LINE_ITEM_PENDING' });
      expect(action).to.exist;
    });

    it('should have PUSH_LINE_ITEM_FULFILLED action', () => {
      action = find(actionsCalled, { type: 'PUSH_LINE_ITEM_FULFILLED' });
      expect(action).to.exist;
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

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

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
      return addOptionToLineItem(order, lineItem, optionGroup, optionItem)(
        store.dispatch,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

    it('should have ADD_OPTION_TO_LINE_ITEM_PENDING action', () => {
      action = find(actionsCalled, { type: 'ADD_OPTION_TO_LINE_ITEM_PENDING' });
      expect(action).to.exist;
    });

    it('should have ADD_OPTION_TO_LINE_ITEM_FULFILLED action', () => {
      action = find(actionsCalled, {
        type: 'ADD_OPTION_TO_LINE_ITEM_FULFILLED',
      });
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
      return removeOptionFromLineItem(order, lineItem, optionItem)(
        store.dispatch,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

    it('should have REMOVE_OPTION_FROM_LINE_ITEM_PENDING action', () => {
      action = find(actionsCalled, {
        type: 'REMOVE_OPTION_FROM_LINE_ITEM_PENDING',
      });
      expect(action).to.exist;
    });

    it('should have REMOVE_OPTION_FROM_LINE_ITEM_FULFILLED action', () => {
      action = find(actionsCalled, {
        type: 'REMOVE_OPTION_FROM_LINE_ITEM_FULFILLED',
      });
      expect(action).to.exist;
    });
  });

  describe('setLineItemQuantity', () => {
    before(() => {
      store = mockStore();
      const order = makeUnpersistedOrder();
      const lineItem = order.cart.addLineItem(productStub, 1);
      return setLineItemQuantity(order, lineItem, 10)(store.dispatch).then(
        () => {
          actionsCalled = store.getActions();
        },
      );
    });

    it('throws with a < 1 quantity', () => {
      const order = makeUnpersistedOrder();
      const lineItem = order.cart.addLineItem(productStub, 1);
      expect(() => {
        setLineItemQuantity(order, lineItem, 0)(store.dispatch);
      }).to.throw;
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

    it('should have SET_LINE_ITEM_QUANTITY_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_LINE_ITEM_QUANTITY_PENDING' });
      expect(action).to.exist;
    });

    it('should have SET_LINE_ITEM_QUANTITY_FULFILLED action', () => {
      action = find(actionsCalled, {
        type: 'SET_LINE_ITEM_QUANTITY_FULFILLED',
      });
      expect(action).to.exist;
    });
  });

  describe('setLineItemMadeFor', () => {
    before(() => {
      store = mockStore();
      const order = makeUnpersistedOrder();
      const lineItem = order.cart.addLineItem(productStub, 1);
      return setLineItemMadeFor(order, lineItem, 'user')(store.dispatch).then(
        () => {
          actionsCalled = store.getActions();
        },
      );
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

    it('should have SET_LINE_ITEM_MADE_FOR_PENDING action', () => {
      action = find(actionsCalled, { type: 'SET_LINE_ITEM_MADE_FOR_PENDING' });
      expect(action).to.exist;
    });

    it('should have SET_LINE_ITEM_MADE_FOR_FULFILLED action', () => {
      action = find(actionsCalled, {
        type: 'SET_LINE_ITEM_MADE_FOR_FULFILLED',
      });
      expect(action).to.exist;
    });
  });

  describe('setLineItemInstructions', () => {
    before(() => {
      store = mockStore();
      const order = makeUnpersistedOrder();
      const lineItem = order.cart.addLineItem(productStub, 1);
      return setLineItemInstructions(order, lineItem, 'Sauce on side')(
        store.dispatch,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

    it('should have SET_LINE_ITEM_INSTRUCTIONS_PENDING action', () => {
      action = find(actionsCalled, {
        type: 'SET_LINE_ITEM_INSTRUCTIONS_PENDING',
      });
      expect(action).to.exist;
    });

    it('should have SET_LINE_ITEM_INSTRUCTIONS_FULFILLED action', () => {
      action = find(actionsCalled, {
        type: 'SET_LINE_ITEM_INSTRUCTIONS_FULFILLED',
      });
      expect(action).to.exist;
    });
  });

  describe('bindCustomerToOrder', () => {
    before(() => {
      store = mockStore();
      return bindCustomerToOrder(makeUnpersistedOrder(), authResponseStub)(
        store.dispatch,
      ).then(() => {
        actionsCalled = store.getActions();
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

    it('should have BIND_CUSTOMER_TO_ORDER_FULFILLED action', () => {
      action = find(actionsCalled, {
        type: 'BIND_CUSTOMER_TO_ORDER_FULFILLED',
      });
      expect(action).to.exist;
    });
  });

  describe('submitOrder', () => {
    before(() => {
      store = mockStore(stateWithBrandibbleRef);
      const order = makeUnpersistedOrder('pickup');

      return fetchMenu(brandibble, { locationId: SAMPLE_MENU_LOCATION_ID })(
        store.dispatch,
        store.getState,
      ).then(({ value: { menu } }) => {
        const product = getNonConfigurableMenuItem(menu);
        order.cart.addLineItem(product, 1, product.id);

        return setOrderLocationId(order, SAMPLE_MENU_LOCATION_ID)(
          store.dispatch,
          store.getState,
        ).then(() => {
          return setOrderAddress(order, addressStub)(store.dispatch).then(
            () => {
              return authenticateUser(brandibble, validCredentialsStub)(
                store.dispatch,
              ).then((res) => {
                return bindCustomerToOrder(order, res.action.payload)(
                  store.dispatch,
                ).then(() => {
                  return setPaymentMethod(order, 'credit', cardStub)(
                    store.dispatch,
                  ).then(() => {
                    // hack to reset any previously set promo codes
                    return setPromoCode(makeUnpersistedOrder(), '')(
                      store.dispatch,
                    ).then(() => {
                      store.clearActions();

                      return submitOrder(brandibble, order)(
                        store.dispatch,
                      ).then(() => {
                        actionsCalled = store.getActions();
                      });
                    });
                  });
                });
              });
            },
          );
        });
      });
    });

    it('should call 2 actions', () =>
      expect(actionsCalled).to.have.length.of(2));

    it('should have a payload', () => {
      action = find(actionsCalled, { type: 'SUBMIT_ORDER_FULFILLED' });
      expect(action).to.have.a.property('payload');
    });
  });
});
