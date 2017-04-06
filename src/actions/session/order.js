/* eslint no-shadow:1, no-unused-vars:1, prefer-rest-params:1 */
import BrandibbleReduxException from 'utils/exception';

export const RESOLVE_ORDER = 'RESOLVE_ORDER';
export const ADD_LINE_ITEM = 'ADD_LINE_ITEM';
export const SET_LINE_ITEM_QUANTITY = 'SET_LINE_ITEM_QUANTITY';
export const REMOVE_LINE_ITEM = 'REMOVE_LINE_ITEM';
export const ADD_OPTION_TO_LINE_ITEM = 'ADD_OPTION_TO_LINE_ITEM';
export const REMOVE_OPTION_FROM_LINE_ITEM = 'REMOVE_OPTION_FROM_LINE_ITEM';
export const SET_ORDER_LOCATION_ID = 'SET_ORDER_LOCATION_ID';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';
export const BIND_CUSTOMER_TO_ORDER = 'BIND_CUSTOMER_TO_ORDER';
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const SET_ORDER_ADDRESS = 'SET_ORDER_ADDRESS';
export const SET_PROMO_CODE = 'SET_PROMO_CODE';
export const SET_REQUESTED_AT = 'SET_REQUESTED_AT';
export const CREATE_NEW_ORDER = 'CREATE_NEW_ORDER';
export const VALIDATE_CURRENT_ORDER = 'VALIDATE_CURRENT_ORDER';

/* Private Action Creators */
function _resolveOrder(payload) {
  return { type: RESOLVE_ORDER, payload };
}

function _addLineItem(order, product, quantity) {
  return {
    type: ADD_LINE_ITEM,
    payload: order.addLineItem(product, quantity).then(lineItem => ({ order, lineItem })),
  };
}

function _setLineItemQuantity(order, lineItem, newQuantity) {
  return {
    type: SET_LINE_ITEM_QUANTITY,
    payload: order.setLineItemQuantity(lineItem, newQuantity).then(lineItem => ({ order, lineItem })),
  };
}

function _removeLineItem(order, lineItem) {
  return {
    type: REMOVE_LINE_ITEM,
    payload: order.removeLineItem(lineItem).then(remainingLineItems => ({ order, remainingLineItems })),
  };
}

function _addOptionToLineItem(order, lineItem, optionGroup, optionItem) {
  return {
    type: ADD_OPTION_TO_LINE_ITEM,
    payload: order.addOptionToLineItem(lineItem, optionGroup, optionItem).then(lineItem => ({ order, lineItem })),
  };
}

function _removeOptionFromLineItem(order, lineItem, optionItem) {
  return {
    type: REMOVE_OPTION_FROM_LINE_ITEM,
    payload: order.removeOptionFromLineItem(lineItem, optionItem).then(lineItem => ({ order, lineItem })),
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

function _setPromoCode(order, promo) {
  return {
    type: SET_PROMO_CODE,
    payload: order.setPromoCode(promo).then(order => ({ order })),
  };
}

function _setRequestedAt(order, time) {
  return {
    type: SET_REQUESTED_AT,
    payload: order.setRequestedAt(time).then(order => ({ order })),
  };
}

function _submitOrder(brandibble, order) {
  return {
    type: SUBMIT_ORDER,
    payload: brandibble.orders.submit(order).then(({ data }) => data),
  };
}

function _createNewOrder(data) {
  return {
    type: CREATE_NEW_ORDER,
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
export function createNewOrder(brandibble, location, serviceType) {
  return (dispatch) => {
    const { orders } = brandibble;
    orders.create(location.location_id, serviceType)
    .then((order) => {
      dispatch(_createNewOrder({ order }));
      dispatch(setOrderAddress(order, location));
    });
  };
}

export function resolveOrder(brandibble, locationId = null, serviceType = 'delivery') {
  const { orders } = brandibble;
  const order = orders.current();
  const payload = order ? Promise.resolve({ order }) : orders.create(locationId, serviceType).then(order => ({ order }));
  return dispatch => dispatch(_resolveOrder(payload));
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
  return dispatch => dispatch(_setOrderLocationId(...arguments));
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

export function setLineItemQuantity(currentOrder, lineItem, newQuantity = 1) {
  if (newQuantity < 1) {
    throw new BrandibbleReduxException(
      'updateLineItemQuantity',
      'Please pass quantity more than 1 to this action. Use removeLineItem to remove from order.',
    );
  }
  return dispatch => dispatch(_setLineItemQuantity(...arguments));
}

export function setPaymentMethod(currentOrder, type, card) {
  return dispatch => dispatch(_setPaymentMethod(currentOrder, type, card));
}

export function setRequestedAt(currentOrder, time) {
  return dispatch => dispatch(_setRequestedAt(currentOrder, time));
}

export function setPromoCode(currentOrder, promo) {
  return dispatch => dispatch(_setPromoCode(currentOrder, promo));
}

export function removeLineItem(currentOrder, lineItem) {
  return dispatch => dispatch(_removeLineItem(...arguments));
}

export function addOptionToLineItem(currentOrder, lineItem, optionGroup, optionItem) {
  return dispatch => dispatch(_addOptionToLineItem(...arguments));
}

export function removeOptionFromLineItem(currentOrder, lineItem, optionItem) {
  return dispatch => dispatch(_removeOptionFromLineItem(...arguments));
}

export function bindCustomerToOrder(...args) {
  return dispatch => dispatch(_bindCustomerToOrder(...args));
}

export function submitOrder(...args) {
  return dispatch => dispatch(_submitOrder(...args));
}
