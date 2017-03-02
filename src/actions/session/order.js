import BrandibbleReduxException from 'utils/exception';

export const RESOLVE_ORDER = 'RESOLVE_ORDER';
export const ADD_LINE_ITEM = 'ADD_LINE_ITEM';
export const SET_LINE_ITEM_QUANTITY = 'SET_LINE_ITEM_QUANTITY';
export const REMOVE_LINE_ITEM = 'REMOVE_LINE_ITEM';
export const ADD_OPTION_TO_LINE_ITEM = 'ADD_OPTION_TO_LINE_ITEM';
export const REMOVE_OPTION_FROM_LINE_ITEM = 'REMOVE_OPTION_FROM_LINE_ITEM';
export const SET_ORDER_LOCATION_ID = 'SET_ORDER_LOCATION_ID';

/* Private Action Creators */
function _resolveOrder(payload) {
  return { type: RESOLVE_ORDER, payload };
}

function _addLineItem(order, product, quantity) {
  return {
    type: ADD_LINE_ITEM,
    payload: order.addLineItem(product, quantity).then(lineItem => ({ order, lineItem }))
  };
}

function _setLineItemQuantity(order, lineItem, newQuantity) {
  return {
    type: SET_LINE_ITEM_QUANTITY,
    payload: order.setLineItemQuantity(lineItem, newQuantity).then(lineItem => ({ order, lineItem }))
  };
}

function _removeLineItem(order, lineItem) {
  return {
    type: REMOVE_LINE_ITEM,
    payload: order.removeLineItem(lineItem).then(remainingLineItems => ({ order, remainingLineItems }))
  };
}

function _addOptionToLineItem(order, lineItem, optionGroup, optionItem) {
  return {
    type: ADD_OPTION_TO_LINE_ITEM,
    payload: order.addOptionToLineItem(lineItem, optionGroup, optionItem).then(lineItem => ({ order, lineItem }))
  };
}

function _removeOptionFromLineItem(order, lineItem, optionItem) {
  return {
    type: REMOVE_OPTION_FROM_LINE_ITEM,
    payload: order.removeOptionFromLineItem(lineItem, optionItem).then(lineItem => ({ order, lineItem }))
  };
}

function _setOrderLocationId(order, locationId) {
  return {
    type: SET_ORDER_LOCATION_ID,
    payload: order.setLocation(locationId).then(order => ({ order }))
  };
}

/* Public Functions */
export function resolveOrder(brandibble, locationId = null, serviceType = 'delivery') {
  const { orders } = brandibble;
  const order = orders.current();
  const payload = order ? Promise.resolve({ order }) : orders.create(locationId, serviceType).then(order => ({ order }));
  return dispatch => dispatch(_resolveOrder(payload));
}

export function setOrderLocationId(currentOrder, locationId) {
  return dispatch => dispatch(_setOrderLocationId(...arguments));
}

export function addLineItem(currentOrder, product, quantity=1) {
  if (!currentOrder.locationId) {
    throw new BrandibbleReduxException(
      'addLineItem',
      'Please set a Location ID for this order.'
    );
  }
  return dispatch => dispatch(_addLineItem(...arguments));
}

export function setLineItemQuantity(currentOrder, lineItem, newQuantity=1) {
  if (newQuantity < 1) {
    throw new BrandibbleReduxException(
      'updateLineItemQuantity',
      'Please pass quantity more than 1 to this action. Use removeLineItem to remove from order.'
    );
  }
  return dispatch => dispatch(_setLineItemQuantity(...arguments));
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
