/* eslint no-shadow:1, no-unused-vars:1, prefer-rest-params:1 */
import { DateTime } from 'luxon';
import BrandibbleReduxException from '../../utils/exception';
import {
  Defaults,
  Asap,
  ErrorCodes,
  WantsFutureReasons,
} from '../../utils/constants';
import fireAction from '../../utils/fireAction';
import handleErrors from '../../utils/handleErrors';
import get from '../../utils/get';
import getInvalidLineItems from '../../utils/getInvalidLineItems';
import jsDateToValidISO8601 from '../../utils/jsDateToValidISO8601';
import { getStateWithNamespace } from '../../utils/getStateWithNamespace';
import { supportsCatering } from '../../utils/orderTypes';
import { updateInvalidOrderRequestedAt } from '../application';
import { authenticateUser } from './user';
import { fetchMenu } from './menus';
import { fetchLocation } from '../data/locations';
import { locationsAsArray } from '../../selectors/locations';

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
export const ATTEMPT_REORDER = 'ATTEMPT_REORDER';

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

function _attemptReorder(payload, callback) {
  return {
    type: ATTEMPT_REORDER,
    payload: payload.then(callback).catch(callback),
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
      let isAsap;

      const NOW = new Date();

      // If the orders requested at
      // is 'asap' then we fetch the menu for NOW
      // and leave the order untouched
      if (orderRequestedAt === Asap) {
        isAsap = true;
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
          isAsap = true;
          requestedAt = NOW;
          promises.push(dispatch(setRequestedAt(order, Asap, false)));
        } else {
          // In the case that it is not in the past
          // we set the new requestedAt to the orders requested at
          // and continue with fetching the menu
          isAsap = false;
          requestedAt = orderRequestedAt;
        }
      }

      const menuType = {
        locationId: orderLocationId,
        requestedAt,
        serviceType: orderServiceType,
      };

      const menuOptions = {
        isAsap,
      };

      promises.push(dispatch(fetchMenu(brandibble, menuType, menuOptions)));
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

export function validateCurrentCart(
  brandibble,
  data = {},
  testChanges = {},
  options = {},
) {
  return (dispatch) => {
    const { orders } = brandibble;
    const order = orders.current();
    const payload = orders
      .validateCart(order, data, testChanges, options)
      .then(res => res);
    return dispatch(_validateCurrentCart(payload));
  };
}

export function validateCurrentOrder(brandibble, data = {}, options = {}) {
  return (dispatch) => {
    const { orders } = brandibble;
    const order = orders.current();
    const payload = orders.validate(order, data, options).then(res => res);
    return dispatch(_validateCurrentOrder(payload));
  };
}

export function setOrderLocationId(
  currentOrder,
  locationId,
  onValidationError,
  validateOptions = {},
) {
  return (dispatch, getState) => {
    const setOrderLocationIdLogic = () => (dispatch, getState) => {
      return dispatch(_setOrderLocationId(currentOrder, locationId))
        .then(() => {
          /**
           * Prior to resolving, we want to ensure
           * a valid requested at for the current location
           */
          const state = getStateWithNamespace(getState);
          const brandibbleRef = get(state, 'ref');
          const requestedAt = get(
            state,
            'session.order.orderData.requested_at',
          );
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

          if (!hasLocationInMemory) {
            return dispatch(
              fetchLocation(brandibbleRef, locationId, {
                requested_at: requestedAt,
                include_times: true,
              }),
            );
          }

          return Promise.resolve();
        })
        .then(() => {
          /**
           * Finally, we run the updateInvalidRequestedAt logic against the
           * new state, which will update the requested at if it is considered
           * invalid or outdated.
           */
          return dispatch(updateInvalidOrderRequestedAt());
        });
    };

    /**
     * If passed an onValidationError callback
     * we attempt to validate before proceeding
     */
    const state = getStateWithNamespace(getState);
    const cart = get(state, 'session.order.orderData.cart', []);
    const hasItemsInCart = !!cart && cart.length;
    if (
      hasItemsInCart &&
      (onValidationError && typeof onValidationError === 'function')
    ) {
      return dispatch(
        _withCartValidation(
          { location_id: locationId },
          onValidationError,
          setOrderLocationIdLogic,
          validateOptions,
        ),
      );
    }
    /**
     * Otherwise, we proceed with
     * the original intended logic
     */
    return dispatch(setOrderLocationIdLogic());
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

export function setRequestedAt(
  currentOrder,
  time,
  wantsFuture,
  onValidationError,
  validateOptions = {},
) {
  return (dispatch, getState) => {
    const setRequestedAtLogic = () => (dispatch, getState) => {
      if (typeof wantsFuture !== 'boolean') {
        const wantsFutureInfo = _determineIfWantsFuture(time);
        const state = getStateWithNamespace(getState);
        const locations = locationsAsArray(state);
        const isCateringLocation = !!locations.find(location =>
          supportsCatering(location.order_types),
        );

        if (wantsFutureInfo.reason === WantsFutureReasons.isPast) {
          time = Asap;
        }

        if (time === Asap && isCateringLocation) {
          const brandibbleRef = get(state, 'ref');
          const orderData = get(state, 'session.order.orderData');
          const locationId = get(orderData, 'location_id');
          const serviceType = get(orderData, 'service_type');
          const now = DateTime.local().toJSDate();

          return dispatch(
            fetchLocation(brandibbleRef, locationId, {
              service_type: serviceType,
              requested_at: now,
              include_times: true,
            }),
          ).then((res) => {
            const firstAvailableOrderTime = get(
              res,
              `value.first_times.${serviceType}.utc`,
            );

            const wantsFutureInfo = _determineIfWantsFuture(
              firstAvailableOrderTime,
            );

            return dispatch(
              setRequestedAt(
                currentOrder,
                firstAvailableOrderTime,
                wantsFutureInfo.wantsFuture,
              ),
            );
          });
        }

        return dispatch(
          _setRequestedAt(currentOrder, time, wantsFutureInfo.wantsFuture),
        );
      }

      return dispatch(_setRequestedAt(currentOrder, time, wantsFuture));
    };

    /**
     * If passed an onValidationError callback
     * we attempt to validate before proceeding
     */
    const state = getStateWithNamespace(getState);
    const cart = get(state, 'session.order.orderData.cart', []);
    const hasItemsInCart = !!cart && cart.length;
    if (
      hasItemsInCart &&
      (onValidationError && typeof onValidationError === 'function')
    ) {
      return dispatch(
        _withCartValidation(
          { requested_at: time },
          onValidationError,
          setRequestedAtLogic,
          validateOptions,
        ),
      );
    }
    /**
     * Otherwise, we proceed with
     * the original intended logic
     */
    return dispatch(setRequestedAtLogic());
  };
}

export function setPromoCode(currentOrder, promo) {
  return dispatch => dispatch(_setPromoCode(currentOrder, promo));
}

export function setServiceType(
  currentOrder,
  serviceType,
  onValidationError,
  validateOptions = {},
) {
  return (dispatch, getState) => {
    const setServiceTypeLogic = () => dispatch =>
      dispatch(_setServiceType(currentOrder, serviceType));

    /**
     * If passed an onValidationError callback
     * we attempt to validate before proceeding
     */
    const state = getStateWithNamespace(getState);
    const cart = get(state, 'session.order.orderData.cart', []);
    const hasItemsInCart = !!cart && cart.length;
    if (
      hasItemsInCart &&
      (onValidationError && typeof onValidationError === 'function')
    ) {
      return dispatch(
        _withCartValidation(
          { service_type: serviceType },
          onValidationError,
          setServiceTypeLogic,
          validateOptions,
        ),
      );
    }
    /**
     * Otherwise, we proceed with
     * the original intended logic
     */
    return dispatch(setServiceTypeLogic());
  };
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

export function attemptReorder(
  order,
  callback = f => f,
  shouldClearCart = true,
) {
  return (dispatch, getState) => {
    const state = getStateWithNamespace(getState);
    const currentOrderLocationId = get(
      state,
      'session.order.orderData.location_id',
    );
    const brandibbleRef = get(state, 'ref');
    const orderRef = get(state, 'session.order.ref');
    const lineItemsData = get(state, 'session.order.lineItemsData', []);
    const orderItems = get(order, 'items', []);
    const orderLocationId = get(order, 'location_id');
    const orderServiceType = get(order, 'service_type');
    const orderRequestedAt = get(order, 'requested_at');
    const nowInISO8601Format = jsDateToValidISO8601();
    const requestedAtIsAsap = orderRequestedAt === Asap;

    const payload = new Promise((resolve, reject) => {
      // 1. we need to ensure that our order has a location_id (an order without a
      // location_id doesn't make sense), so if it doesn't have one, we have to
      // set it manually
      (currentOrderLocationId && currentOrderLocationId === orderLocationId
        ? Promise.resolve()
        : dispatch(setOrderLocationId(orderRef, orderLocationId))
      ).then(() => {
        // 2. We'll want to ensure we have the latest menu and location for that menu
        // in memory
        return Promise.all([
          dispatch(
            fetchMenu(
              brandibbleRef,
              {
                locationId: orderLocationId,
                serviceType: orderServiceType,
                requestedAt: nowInISO8601Format,
              },
              {
                isAsap: requestedAtIsAsap,
              },
            ),
          ),
          dispatch(
            fetchLocation(brandibbleRef, orderLocationId, {
              service_type: orderServiceType,
              requested_at: nowInISO8601Format,
              include_times: true,
            }),
          ),
        ])
          .then(() => {
            // 3. if the location we are ordering from is a catering location
            // and the requested_at is for 'asap', we need to turn that into
            // the closest IS08601 equivalent, as a catering location's requested_at
            // must be a valid date/time string (and unlike OLO, cannot be of string 'asap')
            const nextState = getStateWithNamespace(getState);
            const locations = locationsAsArray(nextState);
            const isCateringLocation = !!locations.find(location =>
              supportsCatering(location.order_types),
            );

            if (isCateringLocation && requestedAtIsAsap) {
              const nowInISO8601Format = jsDateToValidISO8601();

              return dispatch(
                setRequestedAt(orderRef, nowInISO8601Format, false),
              );
            }
            return Promise.resolve();
          })
          .then(() => {
            const nextState = getStateWithNamespace(getState);
            const menusById = get(nextState, 'session.menus');

            const removals = shouldClearCart
              ? lineItemsData.map(item =>
                  dispatch(removeLineItem(orderRef, item)),
                )
              : [];

            return Promise.all(removals).then(() => {
              const defaultResponse = {
                isReorderable: false,
                itemsWereRemoved: shouldClearCart && !!removals.length,
              };

              return _buildLineItemsForReorder(
                brandibbleRef,
                orderLocationId,
                menusById,
                orderItems,
              )
                .then(({ reorderItems, failedItems }) => {
                  if (reorderItems.length) {
                    const pushedLineItems = reorderItems.map(item =>
                      dispatch(pushLineItem(orderRef, item)),
                    );

                    Promise.all(pushedLineItems).then(() => {
                      if (failedItems.length) {
                        resolve({
                          ...defaultResponse,
                          isReorderable: true,
                          itemsWereRemoved: true,
                        });
                        return;
                      }

                      resolve({ ...defaultResponse, isReorderable: true });
                    });
                  } else {
                    // In this case the order was NOT reorderable
                    // so we reject, resulting in an action status of REJECTED
                    reject({ ...defaultResponse });
                  }
                })
                .catch(() => {
                  // If the buildLineItemsForReorder fails for some reason
                  // the order is also NOT reorderable
                  // so we reject resulting in an action status of REJECTED
                  reject({ ...defaultResponse });
                });
            });
          });
      });
    });

    return dispatch(_attemptReorder(payload, callback));
  };
}

/*
 Private
*/
const _determineIfWantsFuture = (requestedAt) => {
  // If the requestedtAt is 'asap'
  // set wantsFuture to false
  if (requestedAt === Asap) {
    return {
      wantsFuture: false,
      reason: WantsFutureReasons.isAsap,
    };
  }

  const now = DateTime.local();
  const requestedAtAsLuxonDateTime = DateTime.fromISO(requestedAt);

  // If the requestedtAt is in the past (rare case)
  // set wantsFuture to false
  if (requestedAtAsLuxonDateTime < now) {
    return {
      wantsFuture: false,
      reason: WantsFutureReasons.isPast,
    };
  }

  if (requestedAtAsLuxonDateTime === now) {
    return {
      wantsFuture: false,
      reason: WantsFutureReasons.isNow,
    };
  }

  // If the requestedAt is in the future
  // set wantsFuture to true
  if (requestedAtAsLuxonDateTime > now) {
    return {
      wantsFuture: true,
      reason: WantsFutureReasons.isFuture,
    };
  }
};

export function _buildLineItemsForReorder(
  brandibbleRef,
  orderLocationId,
  menusById,
  items,
) {
  return new Promise((resolve) => {
    const keyForMenu = Object.keys(menusById).find(
      menuKey => menusById[menuKey].location_id === orderLocationId,
    );
    const menu = menusById[keyForMenu];
    const failedItems = [];

    const reorderItems = items
      .map((item) => {
        const orphan = brandibbleRef.orders.buildLineItemOrphan(
          item,
          get(menu, 'menu', []),
        );

        /**
         * If an orphan can't be built we consider it a
         * failed item, and push it into the
         * array of failed items
         */

        if (!orphan) {
          failedItems.push(item);
        }

        /**
         * Otherwise, If an orphan can be built
         * set the quantity and return as
         * a valid reorder item
         */
        orphan.quantity = item.quantity;
        return orphan;
      })
      .filter(mappedItem => !!mappedItem);

    return resolve({ reorderItems, failedItems });
  });
}

export function _withCartValidation(
  validationHash,
  onValidationError,
  actionCallback,
  options = {},
) {
  return (dispatch, getState) => {
    const state = getStateWithNamespace(getState);
    const ref = get(state, 'ref');
    const isAttemptingToSetLocationId = 'location_id' in validationHash;
    const isAttemptingToSetServiceType = 'service_type' in validationHash;
    const isAttemptingToSetRequestedAt = 'requested_at' in validationHash;

    return (
      dispatch(validateCurrentCart(ref, validationHash, options))
        /**
         * If the validation succeeds
         * we dispatch the actionCallback
         */
        .then(dispatch(actionCallback()))
        /**
         * If the validation throws
         * we return a function that encapsulates
         * the necessary steps to resolve the error
         * before finally dispatching the actionCallback
         */
        .catch((err) => {
          const proceed = () => {
            if (err && get(err, 'errors', []).length) {
              const errorCode = get(err.errors[0], 'code');
              const orderRef = get(state, 'session.order.ref');
              /**
               * Invalid items in cart
               */
              if (errorCode === ErrorCodes.validateCart.invalidItems) {
                const lineItemsData = get(
                  state,
                  'session.order.lineItemsData',
                  [],
                );
                const [, ...invalidItems] = get(err, 'errors');

                const invalidItemsInCart = getInvalidLineItems(
                  invalidItems,
                  lineItemsData,
                );

                const promises = invalidItemsInCart.map(invalidItem =>
                  dispatch(removeLineItem(orderRef, invalidItem)),
                );

                return Promise.all(promises).then(dispatch(actionCallback()));
              }

              /**
               * Location is closed
               */
              if (errorCode === ErrorCodes.validateCart.locationIsClosed) {
                const allLocationsById = get(
                  state,
                  'data.locations.locationsById',
                );

                const locationId = isAttemptingToSetLocationId
                  ? validationHash.location_id
                  : get(state, 'session.order.orderData.location_id');
                const serviceType = isAttemptingToSetServiceType
                  ? validationHash.service_type
                  : get(state, 'session.order.orderData.service_type');
                const requestedAt = isAttemptingToSetRequestedAt
                  ? validationHash.requested_at
                  : get(state, 'session.order.orderData.requested_at');

                /**
                 * If the location already exists in memory
                 * we find the first available order time
                 */
                if (locationId in allLocationsById) {
                  const location = get(allLocationsById, `${locationId}`);
                  const firstAvailableOrderTime = get(
                    location,
                    `first_times.${serviceType}.utc`,
                  );
                  return dispatch(
                    setRequestedAt(orderRef, firstAvailableOrderTime),
                  ).then(dispatch(actionCallback()));
                }

                /**
                 * Otherwise, we fetch the location
                 * and then find the first available order time
                 */
                return dispatch(
                  fetchLocation(ref, locationId, {
                    service_type: serviceType,
                    requested_at: requestedAt,
                    include_times: true,
                  }),
                ).then(() => {
                  const nextState = getStateWithNamespace(getState);
                  const nextAllLocationsById = get(
                    nextState,
                    'data.locations.locationsById',
                  );
                  const location = get(nextAllLocationsById, `${locationId}`);
                  const firstAvailableOrderTime = get(
                    location,
                    `first_times.${serviceType}.utc`,
                  );

                  return dispatch(
                    setRequestedAt(orderRef, firstAvailableOrderTime),
                  ).then(dispatch(actionCallback()));
                });
              }

              /**
               * Unmet delivery minimum
               * (not much we can do here apart from notify the customer)
               */
              if (errorCode === ErrorCodes.validateCart.unmetDeliveryMinimum) {
                return () => Promise.resolve();
              }
            }
          };

          return onValidationError(err, proceed);
        })
    );
  };
}
