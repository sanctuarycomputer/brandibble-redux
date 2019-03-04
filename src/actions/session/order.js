/* eslint no-shadow:1, no-unused-vars:1, prefer-rest-params:1 */
import BrandibbleReduxException from '../../utils/exception';
import { Defaults, Asap } from '../../utils/constants';
import fireAction from '../../utils/fireAction';
import handleErrors from '../../utils/handleErrors';
import get from '../../utils/get';
import { getStateWithNamespace } from '../../utils/getStateWithNamespace';
import { updateInvalidOrderRequestedAt } from '../application';
import { authenticateUser } from './user';
import { fetchMenu } from './menus';
import { fetchLocation } from '../data/locations';

export const RESOLVE_ORDER = 'RESOLVE_ORDER';
export const RESOLVE_ORDER_LOCATION = 'RESOLVE_ORDER_LOCATION';
export const ADD_LINE_ITEM = 'ADD_LINE_ITEM';
export const PUSH_LINE_ITEM = 'PUSH_LINE_ITEM';
export const SET_LINE_ITEM_QUANTITY = 'SET_LINE_ITEM_QUANTITY';
export const REMOVE_LINE_ITEM = 'REMOVE_LINE_ITEM';
export const ADD_OPTION_TO_LINE_ITEM = 'ADD_OPTION_TO_LINE_ITEM';
export const REMOVE_OPTION_FROM_LINE_ITEM = 'REMOVE_OPTION_FROM_LINE_ITEM';
export const SET_ORDER_LOCATION_ID = 'SET_ORDER_LOCATION_ID';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';
export const BIND_CUSTOMER_TO_ORDER = 'BIND_CUSTOMER_TO_ORDER';
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const SET_TIP = 'SET_TIP';
export const RESET_TIP = 'RESET_TIP';
export const SET_ORDER_ADDRESS = 'SET_ORDER_ADDRESS';
export const SET_PROMO_CODE = 'SET_PROMO_CODE';
export const SET_SERVICE_TYPE = 'SET_SERVICE_TYPE';
export const SET_MISC_OPTIONS = 'SET_MISC_OPTIONS';
export const SET_REQUESTED_AT = 'SET_REQUESTED_AT';
export const CREATE_NEW_ORDER = 'CREATE_NEW_ORDER';
export const VALIDATE_CURRENT_ORDER = 'VALIDATE_CURRENT_ORDER';
export const VALIDATE_CURRENT_CART = 'VALIDATE_CURRENT_CART';
export const SET_LINE_ITEM_MADE_FOR = 'SET_LINE_ITEM_MADE_FOR';
export const SET_LINE_ITEM_INSTRUCTIONS = 'SET_LINE_ITEM_INSTRUCTIONS';
export const ADD_APPLIED_DISCOUNT = 'ADD_APPLIED_DISCOUNT';
export const REMOVE_APPLIED_DISCOUNT = 'REMOVE_APPLIED_DISCOUNT';

/* Private Action Creators */
function _resolveOrder(payload) {
  return { type: RESOLVE_ORDER, payload };
}

function _resolveOrderLocation(payload) {
  return { type: RESOLVE_ORDER_LOCATION, payload };
}

function _addLineItem(order, product, quantity) {
  return {
    type: ADD_LINE_ITEM,
    payload: order
      .addLineItem(product, quantity)
      .then(lineItem => ({ order, lineItem })),
  };
}

/* This can be used to add an already built lineItem to cart */
function _pushLineItem(order, lineItem) {
  return {
    type: PUSH_LINE_ITEM,
    payload: order
      .pushLineItem(lineItem)
      .then(lineItem => ({ order, lineItem })),
  };
}

function _setLineItemQuantity(order, lineItem, newQuantity) {
  return {
    type: SET_LINE_ITEM_QUANTITY,
    payload: order
      .setLineItemQuantity(lineItem, newQuantity)
      .then(lineItem => ({ order, lineItem })),
  };
}

function _setLineItemMadeFor(order, lineItem, madeFor) {
  return {
    type: SET_LINE_ITEM_MADE_FOR,
    payload: order
      .setLineItemMadeFor(lineItem, madeFor)
      .then(lineItem => ({ order, lineItem })),
  };
}

function _setLineItemInstructions(order, lineItem, instructions) {
  return {
    type: SET_LINE_ITEM_INSTRUCTIONS,
    payload: order
      .setLineItemInstructions(lineItem, instructions)
      .then(lineItem => ({ order, lineItem })),
  };
}

function _removeLineItem(order, lineItem) {
  return {
    type: REMOVE_LINE_ITEM,
    payload: order
      .removeLineItem(lineItem)
      .then(remainingLineItems => ({ order, remainingLineItems })),
  };
}

function _addOptionToLineItem(order, lineItem, optionGroup, optionItem) {
  return {
    type: ADD_OPTION_TO_LINE_ITEM,
    payload: order
      .addOptionToLineItem(lineItem, optionGroup, optionItem)
      .then(lineItem => ({ order, lineItem })),
  };
}

function _removeOptionFromLineItem(order, lineItem, optionItem) {
  return {
    type: REMOVE_OPTION_FROM_LINE_ITEM,
    payload: order
      .removeOptionFromLineItem(lineItem, optionItem)
      .then(lineItem => ({ order, lineItem })),
  };
}

function _setOrderLocationId(order, locationId) {
  return {
    type: SET_ORDER_LOCATION_ID,
    payload: order.setLocation(locationId).then(order => ({ order })),
  };
}

function _setOrderAddress(order, address) {
  return {
    type: SET_ORDER_ADDRESS,
    payload: order.setAddress(address).then(order => ({ order })),
  };
}

function _bindCustomerToOrder(order, customer) {
  return {
    type: BIND_CUSTOMER_TO_ORDER,
    payload: order.setCustomer(customer).then(order => ({ order })),
  };
}

function _setPaymentMethod(order, type, card) {
  return {
    type: SET_PAYMENT_METHOD,
    payload: order.setPaymentMethod(type, card).then(order => ({ order })),
  };
}

function _setTip(order, paymentType, tip) {
  return {
    type: SET_TIP,
    payload: order.setTip(paymentType, tip).then(order => ({ order })),
  };
}

function _resetTip(order) {
  return {
    type: RESET_TIP,
    payload: order.resetTip().then(order => ({ order })),
  };
}

function _setPromoCode(order, promo) {
  return {
    type: SET_PROMO_CODE,
    payload: order.setPromoCode(promo).then(order => ({ order })),
  };
}

function _setServiceType(order, serviceType) {
  return {
    type: SET_SERVICE_TYPE,
    payload: order.setServiceType(serviceType).then(order => ({ order })),
  };
}

function _addAppliedDiscount(order, discount) {
  return {
    type: ADD_APPLIED_DISCOUNT,
    payload: order.addAppliedDiscount(discount).then(order => ({ order })),
  };
}

function _removeAppliedDiscount(order, discount) {
  return {
    type: REMOVE_APPLIED_DISCOUNT,
    payload: order.removeAppliedDiscount(discount).then(order => ({ order })),
  };
}

function _setRequestedAt(order, time, wantsFuture) {
  return {
    type: SET_REQUESTED_AT,
    payload: order.setRequestedAt(time, wantsFuture).then(order => ({ order })),
  };
}

function _submitOrder(dispatch, brandibble, order, options) {
  let authStub;
  const submitOptions = {};

  if (options) {
    if (
      options.authenticateNewCustomer &&
      order &&
      order.customer &&
      !order.customer.customer_id
    ) {
      const { email, password } = order.customer;
      if (password && password.length) {
        authStub = { email, password };
      }
    }

    if (options.includeItemDetails) {
      submitOptions.includeItemDetails = true;
    }
  }

  return {
    type: SUBMIT_ORDER,
    payload: brandibble.orders.submit(order, submitOptions).then(({ data }) => {
      if (!authStub) return data;
      return dispatch(authenticateUser(brandibble, authStub)).then(() => {
        data._didAuthenticateNewCustomer = true;
        return data;
      });
    }),
  };
}

function _createNewOrder(data) {
  return {
    type: CREATE_NEW_ORDER,
    payload: data,
  };
}

function _validateCurrentCart(data) {
  return {
    type: VALIDATE_CURRENT_CART,
    payload: data,
  };
}

function _validateCurrentOrder(data) {
  return {
    type: VALIDATE_CURRENT_ORDER,
    payload: data,
  };
}

/* Public Functions */
export function createNewOrder(
  brandibble,
  locationId = null,
  serviceType,
  paymentType = null,
  miscOptions = Defaults.miscOptions,
) {
  return (dispatch) => {
    const { orders } = brandibble;
    const payload = orders
      .create(locationId, serviceType, paymentType, miscOptions)
      .then(order => ({ order }));
    return dispatch(_createNewOrder(payload));
  };
}

export function resolveOrder(
  brandibble,
  locationId = null,
  serviceType = 'pickup',
  paymentType = null,
  miscOptions = Defaults.miscOptions,
) {
  const { orders } = brandibble;
  const order = orders.current();
  const payload = order
    ? Promise.resolve({ order })
    : orders
        .create(locationId, serviceType, paymentType, miscOptions)
        .then(res => ({ order: res }));

  return dispatch =>
    dispatch(_resolveOrder(payload)).then((res) => {
      const order = get(res, 'value.order');
      const orderLocationId = get(order, 'locationId');
      const orderRequestedAt = get(order, 'requestedAt');
      const orderServiceType = get(order, 'serviceType');

      if (!orderLocationId) return;

      const promises = [];
      let requestedAt;

      const NOW = new Date();

      // If the orders requested at
      // is 'asap' then we fetch the menu for NOW
      // and leave the order untouched
      if (orderRequestedAt === Asap) {
        requestedAt = NOW;
      } else {
        // Otherwise, we check to see if the resolved order's
        // requested at is in the past
        const orderRequestedAtAsDate = new Date(orderRequestedAt);
        if (orderRequestedAtAsDate < NOW) {
          // In the case that it is in the past
          // we update the orders requested at to 'asap'
          // and push that into the array of promises
          // to be resolved
          requestedAt = NOW;
          promises.push(dispatch(setRequestedAt(order, Asap)));
        } else {
          // In the case that it is not in the past
          // we set the new requestedAt to the orders requested at
          // and continue with fetching the menu
          requestedAt = orderRequestedAt;
        }
      }

      const menuType = {
        locationId: orderLocationId,
        requestedAt,
        serviceType: orderServiceType,
      };

      promises.push(dispatch(fetchMenu(brandibble, menuType)));
      promises.push(
        dispatch(
          fetchLocation(brandibble, orderLocationId, {
            requested_at: requestedAt,
            include_times: true,
          }),
        ),
      );
      return Promise.all(promises);
    });
}

export function resolveOrderLocation(brandibble) {
  const { orders } = brandibble;
  const order = orders.current();
  const payload =
    order && order.locationId
      ? brandibble.locations.show(order.locationId).then(({ data }) => data)
      : Promise.resolve(null);
  return dispatch => dispatch(_resolveOrderLocation(payload));
}

export function validateCurrentCart(brandibble, data = {}) {
  return (dispatch) => {
    const { orders } = brandibble;
    const order = orders.current();
    const payload = orders.validateCart(order, data).then(res => res);
    return dispatch(_validateCurrentCart(payload));
  };
}

export function validateCurrentOrder(brandibble, data = {}) {
  return (dispatch) => {
    const { orders } = brandibble;
    const order = orders.current();
    const payload = orders.validate(order, data).then(res => res);
    return dispatch(_validateCurrentOrder(payload));
  };
}

export function setOrderLocationId(currentOrder, locationId) {
  return (dispatch, getState) => {
    return dispatch(_setOrderLocationId(...arguments)).then((res) => {
      /**
       * Prior to resolving, we want to ensure
       * a valid requested at for the current location
       */
      const state = getStateWithNamespace(getState);
      const brandibbleRef = get(state, 'ref');
      const requestedAt = get(state, 'session.order.orderData.requested_at');
      const hasLocationInMemory = !!get(
        state,
        `data.locations.locationsById.${locationId}`,
        false,
      );

      /**
       * First we determine whether the location exists in memory
       * If it does, we fetch the location with the new locationId
       * otherwise we return a resolved Promise
       */
      (!hasLocationInMemory
        ? dispatch(
            fetchLocation(brandibbleRef, locationId, {
              requested_at: requestedAt,
              include_times: true,
            }),
          )
        : Promise.resolve()
      ).then(() => {
        /**
         * Finally, we run the updateInvalidRequestedAt logic against the
         * new state, which will update the requested at if it is considered
         * invalid or outdated.
         */
        return dispatch(updateInvalidOrderRequestedAt());
      });
    });
  };
}

export function setOrderAddress(...args) {
  return dispatch => dispatch(_setOrderAddress(...args));
}

export function addLineItem(currentOrder, product, quantity = 1) {
  if (!currentOrder.locationId) {
    throw new BrandibbleReduxException(
      'addLineItem',
      'Please set a Location ID for this order.',
    );
  }
  return dispatch => dispatch(_addLineItem(...arguments));
}

export function pushLineItem(currentOrder, lineItem) {
  if (!currentOrder.locationId) {
    throw new BrandibbleReduxException(
      'addLineItem',
      'Please set a Location ID for this order.',
    );
  }
  return dispatch => dispatch(_pushLineItem(...arguments));
}

export function setLineItemQuantity(currentOrder, lineItem, newQuantity = 1) {
  if (newQuantity < 1) {
    throw new BrandibbleReduxException(
      'updateLineItemQuantity',
      'Please pass quantity more than 1 to this action. Use removeLineItem to remove from order.',
    );
  }
  return dispatch => dispatch(_setLineItemQuantity(...arguments));
}

export function setLineItemMadeFor(currentOrder, lineItem, madeFor = '') {
  return dispatch => dispatch(_setLineItemMadeFor(...arguments));
}

export function setLineItemInstructions(
  currentOrder,
  lineItem,
  instructions = '',
) {
  return dispatch => dispatch(_setLineItemInstructions(...arguments));
}

export function setPaymentMethod(currentOrder, type, card) {
  return dispatch => dispatch(_setPaymentMethod(currentOrder, type, card));
}

export function setTip(currentOrder, paymentType, tip) {
  return dispatch => dispatch(_setTip(currentOrder, paymentType, tip));
}

export function resetTip(currentOrder) {
  return dispatch => dispatch(_resetTip(currentOrder));
}

export function setRequestedAt(currentOrder, time, wantsFuture = false) {
  return dispatch => dispatch(_setRequestedAt(currentOrder, time, wantsFuture));
}

export function setPromoCode(currentOrder, promo) {
  return dispatch => dispatch(_setPromoCode(currentOrder, promo));
}

export function setServiceType(currentOrder, serviceType) {
  return dispatch => dispatch(_setServiceType(currentOrder, serviceType));
}

export function addAppliedDiscount(currentOrder, discount) {
  return dispatch => dispatch(_addAppliedDiscount(currentOrder, discount));
}

export function removeAppliedDiscount(currentOrder, discount) {
  return dispatch => dispatch(_removeAppliedDiscount(currentOrder, discount));
}

export const setMiscOptions = (currentOrder, opts) => (dispatch) => {
  const payload = currentOrder
    .setMiscOptions(opts)
    .then(order => ({ order }))
    .catch(handleErrors);

  return dispatch(fireAction(SET_MISC_OPTIONS, payload));
};

export function removeLineItem(currentOrder, lineItem) {
  return dispatch => dispatch(_removeLineItem(...arguments));
}

export function addOptionToLineItem(
  currentOrder,
  lineItem,
  optionGroup,
  optionItem,
) {
  return dispatch => dispatch(_addOptionToLineItem(...arguments));
}

export function removeOptionFromLineItem(currentOrder, lineItem, optionItem) {
  return dispatch => dispatch(_removeOptionFromLineItem(...arguments));
}

export function bindCustomerToOrder(...args) {
  return dispatch => dispatch(_bindCustomerToOrder(...args));
}

export function submitOrder(brandibble, order, options = {}) {
  return dispatch =>
    dispatch(_submitOrder(dispatch, brandibble, order, options));
}
