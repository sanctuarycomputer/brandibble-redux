// TODO: this reducer is untested
import {
  SEND_SUPPORT_TICKET,
  SETUP_BRANDIBBLE,
  SETUP_BRANDIBBLE_REDUX,
  RESET_APPLICATION,
} from '../actions/application';
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  FETCH_ADDRESSES,
  SET_DEFAULT_ADDRESS,
} from '../actions/session/addresses';
import { FETCH_ALLERGENS } from '../actions/data/allergens';
import { FETCH_BRAND } from '../actions/data/brands';
import { FETCH_MENU } from '../actions/session/menus';
import {
  CREATE_FAVORITE,
  DELETE_FAVORITE,
  FETCH_FAVORITES,
  UPDATE_FAVORITE,
} from '../actions/session/favorites';
import {
  FETCH_PAYMENTS,
  CREATE_PAYMENT,
  DELETE_PAYMENT,
  SET_DEFAULT_PAYMENT,
} from '../actions/session/payments';
import { FETCH_CUSTOMER_LOYALTIES } from '../actions/user/loyalties';
import {
  ADD_LINE_ITEM,
  RESOLVE_ORDER,
  SET_ORDER_LOCATION_ID,
  SUBMIT_ORDER,
  SET_PROMO_CODE,
  SET_SERVICE_TYPE,
  SET_MISC_OPTIONS,
  VALIDATE_CURRENT_CART,
  VALIDATE_CURRENT_ORDER,
  SET_REQUESTED_AT,
  CREATE_NEW_ORDER,
  SET_LINE_ITEM_MADE_FOR,
  SET_LINE_ITEM_INSTRUCTIONS,
  SET_PAYMENT_METHOD,
  SET_TIP,
  RESET_TIP,
  BIND_CUSTOMER_TO_ORDER,
  ADD_APPLIED_DISCOUNT,
  REMOVE_APPLIED_DISCOUNT,
  SET_ORDER_ADDRESS,
  ATTEMPT_REORDER,
} from '../actions/session/order';
import { FETCH_LOCATIONS, FETCH_LOCATION } from '../actions/data/locations';
import { FETCH_GEOLOCATIONS } from '../actions/data/geolocations';
import {
  UPDATE_USER,
  CREATE_USER,
  CREATE_AND_AUTHENTICATE_USER,
  AUTHENTICATE_USER,
  FETCH_LEVELUP_LOYALTY,
  FETCH_LEVELUP_QR_CODE,
  UPDATE_LEVELUP_CONNECTION,
  CONNECT_LEVELUP,
  DISCONNECT_LEVELUP,
  FETCH_LEVELUP_PAYMENT_METHOD,
  FETCH_USER,
  UNAUTHENTICATE_USER,
  RESET_USER_PASSWORD,
  FINISH_RESET_USER_PASSWORD,
  RESET_LEVELUP_PASSWORD,
  RESOLVE_USER,
  VALIDATE_USER,
  ADD_ALLERGENS,
  REMOVE_ALLERGENS,
} from '../actions/session/user';
import {
  FETCH_ALL_CUSTOMER_ORDERS,
  FETCH_PAST_CUSTOMER_ORDERS,
  FETCH_UPCOMING_CUSTOMER_ORDERS,
} from '../actions/data/customerOrders';
import {
  FETCH_RATING,
  CREATE_RATING,
  UPDATE_RATING,
  DELETE_RATING,
} from '../actions/session/ratings';
import { Status } from '../utils/constants';

const { FULFILLED, IDLE, PENDING, REJECTED } = Status;

const initialState = {
  setupBrandibble: IDLE,
  setupBrandibbleRedux: IDLE,
  sendSupportTicket: IDLE,
  resetApplication: IDLE,
  fetchAddresses: IDLE,
  createAddress: IDLE,
  deleteAddress: IDLE,
  setDefaultAddress: IDLE,
  fetchAllergens: IDLE,
  addAllergens: IDLE,
  removeAllergens: IDLE,
  fetchBrand: IDLE,
  fetchCustomerLoyalties: IDLE,
  fetchLevelUpLoyalty: IDLE,
  fetchLevelUpQRCode: IDLE,
  updateLevelUpConnection: IDLE,
  connectLevelUp: IDLE,
  disconnectLevelUp: IDLE,
  fetchLevelUpPaymentMethod: IDLE,
  fetchLocation: IDLE,
  fetchLocations: IDLE,
  fetchGeolocations: IDLE,
  fetchAllCustomerOrders: IDLE,
  fetchPastCustomerOrders: IDLE,
  fetchUpcomingCustomerOrders: IDLE,
  fetchMenu: IDLE,
  resolveOrder: IDLE,
  setOrderLocationId: IDLE,
  submitOrder: IDLE,
  addLineItem: IDLE,
  setRequestedAt: IDLE,
  fetchPayments: IDLE,
  setPromoCode: IDLE,
  setServiceType: IDLE,
  addAppliedDiscount: IDLE,
  removeAppliedDiscount: IDLE,
  setOrderAddress: IDLE,
  setMiscOptions: IDLE,
  createPayment: IDLE,
  setDefaultPayment: IDLE,
  setPaymentMethod: IDLE,
  setTip: IDLE,
  resetTip: IDLE,
  bindCustomerToOrder: IDLE,
  deletePayment: IDLE,
  fetchFavorites: IDLE,
  createFavorite: IDLE,
  updateFavorite: IDLE,
  deleteFavorite: IDLE,
  fetchRating: IDLE,
  createRating: IDLE,
  updateRating: IDLE,
  deleteRating: IDLE,
  authenticateUser: IDLE,
  createUser: IDLE,
  createAndAuthenticateUser: IDLE,
  fetchUser: IDLE,
  resetUserPassword: IDLE,
  finishResetUserPassword: IDLE,
  resetLevelUpPassword: IDLE,
  resolveUser: IDLE,
  unauthenticateUser: IDLE,
  updateUser: IDLE,
  validateUser: IDLE,
  validateCurrentCart: IDLE,
  validateCurrentOrder: IDLE,
  setLineItemMadeFor: IDLE,
  setLineItemInstructions: IDLE,
  createNewOrder: IDLE,
  attemptReorder: IDLE,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case `${SETUP_BRANDIBBLE}_PENDING`:
      return { ...state, setupBrandibble: PENDING };
    case `${SETUP_BRANDIBBLE}_FULFILLED`:
      return { ...state, setupBrandibble: FULFILLED };
    case `${SETUP_BRANDIBBLE}_REJECTED`:
      return { ...state, setupBrandibble: REJECTED };

    case `${SETUP_BRANDIBBLE_REDUX}_PENDING`:
      return { ...state, setupBrandibbleRedux: PENDING };
    case `${SETUP_BRANDIBBLE_REDUX}_FULFILLED`:
      return { ...state, setupBrandibbleRedux: FULFILLED };
    case `${SETUP_BRANDIBBLE_REDUX}_REJECTED`:
      return { ...state, setupBrandibbleRedux: REJECTED };

    case `${SEND_SUPPORT_TICKET}_PENDING`:
      return { ...state, sendSupportTicket: PENDING };
    case `${SEND_SUPPORT_TICKET}_FULFILLED`:
      return { ...state, sendSupportTicket: FULFILLED };
    case `${SEND_SUPPORT_TICKET}_REJECTED`:
      return { ...state, sendSupportTicket: REJECTED };

    case `${FETCH_ALLERGENS}_PENDING`:
      return { ...state, fetchAllergens: PENDING };
    case `${FETCH_ALLERGENS}_FULFILLED`:
      return { ...state, fetchAllergens: FULFILLED };
    case `${FETCH_ALLERGENS}_REJECTED`:
      return { ...state, fetchAllergens: REJECTED };

    case `${FETCH_BRAND}_PENDING`:
      return { ...state, fetchBrand: PENDING };
    case `${FETCH_BRAND}_FULFILLED`:
      return { ...state, fetchBrand: FULFILLED };
    case `${FETCH_BRAND}_REJECTED`:
      return { ...state, fetchBrand: REJECTED };

    case `${FETCH_ADDRESSES}_PENDING`:
      return { ...state, fetchAddresses: PENDING };
    case `${FETCH_ADDRESSES}_FULFILLED`:
      return { ...state, fetchAddresses: FULFILLED };
    case `${FETCH_ADDRESSES}_REJECTED`:
      return { ...state, fetchAddresses: REJECTED };

    case `${CREATE_ADDRESS}_PENDING`:
      return { ...state, createAddress: PENDING };
    case `${CREATE_ADDRESS}_FULFILLED`:
      return { ...state, createAddress: FULFILLED };
    case `${CREATE_ADDRESS}_REJECTED`:
      return { ...state, createAddress: REJECTED };

    case `${DELETE_ADDRESS}_PENDING`:
      return { ...state, deleteAddress: PENDING };
    case `${DELETE_ADDRESS}_FULFILLED`:
      return { ...state, deleteAddress: FULFILLED };
    case `${DELETE_ADDRESS}_REJECTED`:
      return { ...state, deleteAddress: REJECTED };

    case `${SET_DEFAULT_ADDRESS}_PENDING`:
      return { ...state, setDefaultAddress: PENDING };
    case `${SET_DEFAULT_ADDRESS}_FULFILLED`:
      return { ...state, setDefaultAddress: FULFILLED };
    case `${SET_DEFAULT_ADDRESS}_REJECTED`:
      return { ...state, setDefaultAddress: REJECTED };

    case `${FETCH_LOCATIONS}_PENDING`:
      return { ...state, fetchLocations: PENDING };
    case `${FETCH_LOCATIONS}_FULFILLED`:
      return { ...state, fetchLocations: FULFILLED };
    case `${FETCH_LOCATIONS}_REJECTED`:
      return { ...state, fetchLocations: REJECTED };

    case `${FETCH_LOCATION}_PENDING`:
      return { ...state, fetchLocation: PENDING };
    case `${FETCH_LOCATION}_FULFILLED`:
      return { ...state, fetchLocation: FULFILLED };
    case `${FETCH_LOCATION}_REJECTED`:
      return { ...state, fetchLocation: REJECTED };

    case `${FETCH_GEOLOCATIONS}_PENDING`:
      return { ...state, fetchGeolocations: PENDING };
    case `${FETCH_GEOLOCATIONS}_FULFILLED`:
      return { ...state, fetchGeolocations: FULFILLED };
    case `${FETCH_GEOLOCATIONS}_REJECTED`:
      return { ...state, fetchGeolocations: REJECTED };

    case `${SET_PAYMENT_METHOD}_PENDING`:
      return { ...state, setPaymentMethod: PENDING };
    case `${SET_PAYMENT_METHOD}_FULFILLED`:
      return { ...state, setPaymentMethod: FULFILLED };
    case `${SET_PAYMENT_METHOD}_REJECTED`:
      return { ...state, setPaymentMethod: REJECTED };

    case `${SET_TIP}_PENDING`:
      return { ...state, setTip: PENDING };
    case `${SET_TIP}_FULFILLED`:
      return { ...state, setTip: FULFILLED };
    case `${SET_TIP}_REJECTED`:
      return { ...state, setTip: REJECTED };

    case `${RESET_TIP}_PENDING`:
      return { ...state, resetTip: PENDING };
    case `${RESET_TIP}_FULFILLED`:
      return { ...state, resetTip: FULFILLED };
    case `${RESET_TIP}_REJECTED`:
      return { ...state, resetTip: REJECTED };

    case `${BIND_CUSTOMER_TO_ORDER}_PENDING`:
      return { ...state, bindCustomerToOrder: PENDING };
    case `${BIND_CUSTOMER_TO_ORDER}_FULFILLED`:
      return { ...state, bindCustomerToOrder: FULFILLED };
    case `${BIND_CUSTOMER_TO_ORDER}_REJECTED`:
      return { ...state, bindCustomerToOrder: REJECTED };

    case `${FETCH_ALL_CUSTOMER_ORDERS}_PENDING`:
      return { ...state, fetchAllCustomerOrders: PENDING };
    case `${FETCH_ALL_CUSTOMER_ORDERS}_FULFILLED`:
      return { ...state, fetchAllCustomerOrders: FULFILLED };
    case `${FETCH_ALL_CUSTOMER_ORDERS}_REJECTED`:
      return { ...state, fetchAllCustomerOrders: REJECTED };

    case `${FETCH_PAST_CUSTOMER_ORDERS}_PENDING`:
      return { ...state, fetchPastCustomerOrders: PENDING };
    case `${FETCH_PAST_CUSTOMER_ORDERS}_FULFILLED`:
      return { ...state, fetchPastCustomerOrders: FULFILLED };
    case `${FETCH_PAST_CUSTOMER_ORDERS}_REJECTED`:
      return { ...state, fetchPastCustomerOrders: REJECTED };

    case `${FETCH_UPCOMING_CUSTOMER_ORDERS}_PENDING`:
      return { ...state, fetchUpcomingCustomerOrders: PENDING };
    case `${FETCH_UPCOMING_CUSTOMER_ORDERS}_FULFILLED`:
      return { ...state, fetchUpcomingCustomerOrders: FULFILLED };
    case `${FETCH_UPCOMING_CUSTOMER_ORDERS}_REJECTED`:
      return { ...state, fetchUpcomingCustomerOrders: REJECTED };

    case `${FETCH_MENU}_PENDING`:
      return { ...state, fetchMenu: PENDING };
    case `${FETCH_MENU}_FULFILLED`:
      return { ...state, fetchMenu: FULFILLED };
    case `${FETCH_MENU}_REJECTED`:
      return { ...state, fetchMenu: REJECTED };

    case `${RESOLVE_ORDER}_PENDING`:
      return { ...state, resolveOrder: PENDING };
    case `${RESOLVE_ORDER}_FULFILLED`:
      return { ...state, resolveOrder: FULFILLED };
    case `${RESOLVE_ORDER}_REJECTED`:
      return { ...state, resolveOrder: REJECTED };

    case `${ADD_LINE_ITEM}_PENDING`:
      return { ...state, addLineItem: PENDING };
    case `${ADD_LINE_ITEM}_FULFILLED`:
      return { ...state, addLineItem: FULFILLED };
    case `${ADD_LINE_ITEM}_REJECTED`:
      return { ...state, addLineItem: REJECTED };

    case `${SET_REQUESTED_AT}_PENDING`:
      return { ...state, setRequestedAt: PENDING };
    case `${SET_REQUESTED_AT}_FULFILLED`:
      return { ...state, setRequestedAt: FULFILLED };
    case `${SET_REQUESTED_AT}_REJECTED`:
      return { ...state, setRequestedAt: REJECTED };

    case `${SET_LINE_ITEM_MADE_FOR}_PENDING`:
      return { ...state, setLineItemMadeFor: PENDING };
    case `${SET_LINE_ITEM_MADE_FOR}_FULFILLED`:
      return { ...state, setLineItemMadeFor: FULFILLED };
    case `${SET_LINE_ITEM_MADE_FOR}_REJECTED`:
      return { ...state, setLineItemMadeFor: REJECTED };

    case `${SET_LINE_ITEM_INSTRUCTIONS}_PENDING`:
      return { ...state, setLineItemInstructions: PENDING };
    case `${SET_LINE_ITEM_INSTRUCTIONS}_FULFILLED`:
      return { ...state, setLineItemInstructions: FULFILLED };
    case `${SET_LINE_ITEM_INSTRUCTIONS}_REJECTED`:
      return { ...state, setLineItemInstructions: REJECTED };

    case `${CREATE_NEW_ORDER}_PENDING`:
      return { ...state, createNewOrder: PENDING };
    case `${CREATE_NEW_ORDER}_FULFILLED`:
      return { ...state, createNewOrder: FULFILLED };
    case `${CREATE_NEW_ORDER}_REJECTED`:
      return { ...state, createNewOrder: REJECTED };

    case `${SET_ORDER_LOCATION_ID}_PENDING`:
      return { ...state, setOrderLocationId: PENDING };
    case `${SET_ORDER_LOCATION_ID}_FULFILLED`:
      return { ...state, setOrderLocationId: FULFILLED };
    case `${SET_ORDER_LOCATION_ID}_REJECTED`:
      return { ...state, setOrderLocationId: REJECTED };

    case `${SET_PROMO_CODE}_PENDING`:
      return { ...state, setPromoCode: PENDING };
    case `${SET_PROMO_CODE}_FULFILLED`:
      return { ...state, setPromoCode: FULFILLED };
    case `${SET_PROMO_CODE}_REJECTED`:
      return { ...state, setPromoCode: REJECTED };

    case `${SET_SERVICE_TYPE}_PENDING`:
      return { ...state, setServiceType: PENDING };
    case `${SET_SERVICE_TYPE}_FULFILLED`:
      return { ...state, setServiceType: FULFILLED };
    case `${SET_SERVICE_TYPE}_REJECTED`:
      return { ...state, setServiceType: REJECTED };

    case `${ADD_APPLIED_DISCOUNT}_PENDING`:
      return { ...state, addAppliedDiscount: PENDING };
    case `${ADD_APPLIED_DISCOUNT}_FULFILLED`:
      return { ...state, addAppliedDiscount: FULFILLED };
    case `${ADD_APPLIED_DISCOUNT}_REJECTED`:
      return { ...state, addAppliedDiscount: REJECTED };

    case `${REMOVE_APPLIED_DISCOUNT}_PENDING`:
      return { ...state, removeAppliedDiscount: PENDING };
    case `${REMOVE_APPLIED_DISCOUNT}_FULFILLED`:
      return { ...state, removeAppliedDiscount: FULFILLED };
    case `${REMOVE_APPLIED_DISCOUNT}_REJECTED`:
      return { ...state, removeAppliedDiscount: REJECTED };

    case `${SET_ORDER_ADDRESS}_PENDING`:
      return { ...state, setOrderAddress: PENDING };
    case `${SET_ORDER_ADDRESS}_FULFILLED`:
      return { ...state, setOrderAddress: FULFILLED };
    case `${SET_ORDER_ADDRESS}_REJECTED`:
      return { ...state, setOrderAddress: REJECTED };

    case `${SET_MISC_OPTIONS}_PENDING`:
      return { ...state, setMiscOptions: PENDING };
    case `${SET_MISC_OPTIONS}_FULFILLED`:
      return { ...state, setMiscOptions: FULFILLED };
    case `${SET_MISC_OPTIONS}_REJECTED`:
      return { ...state, setMiscOptions: REJECTED };

    case `${SUBMIT_ORDER}_PENDING`:
      return { ...state, submitOrder: PENDING };
    case `${SUBMIT_ORDER}_FULFILLED`:
      return { ...state, submitOrder: FULFILLED };
    case `${SUBMIT_ORDER}_REJECTED`:
      return { ...state, submitOrder: REJECTED };

    // Payments
    case `${FETCH_PAYMENTS}_PENDING`:
      return { ...state, fetchPayments: PENDING };
    case `${FETCH_PAYMENTS}_FULFILLED`:
      return { ...state, fetchPayments: FULFILLED };
    case `${FETCH_PAYMENTS}_REJECTED`:
      return { ...state, fetchPayments: REJECTED };

    case `${CREATE_PAYMENT}_PENDING`:
      return { ...state, createPayment: PENDING };
    case `${CREATE_PAYMENT}_FULFILLED`:
      return { ...state, createPayment: FULFILLED };
    case `${CREATE_PAYMENT}_REJECTED`:
      return { ...state, createPayment: REJECTED };

    case `${DELETE_PAYMENT}_PENDING`:
      return { ...state, deletePayment: PENDING };
    case `${DELETE_PAYMENT}_FULFILLED`:
      return { ...state, deletePayment: FULFILLED };
    case `${DELETE_PAYMENT}_REJECTED`:
      return { ...state, deletePayment: REJECTED };

    case `${SET_DEFAULT_PAYMENT}_PENDING`:
      return { ...state, setDefaultPayment: PENDING };
    case `${SET_DEFAULT_PAYMENT}_FULFILLED`:
      return { ...state, setDefaultPayment: FULFILLED };
    case `${SET_DEFAULT_PAYMENT}_REJECTED`:
      return { ...state, setDefaultPayment: REJECTED };

    case `${FETCH_CUSTOMER_LOYALTIES}_PENDING`:
      return { ...state, fetchCustomerLoyalties: PENDING };
    case `${FETCH_CUSTOMER_LOYALTIES}_FULFILLED`:
      return { ...state, fetchCustomerLoyalties: FULFILLED };
    case `${FETCH_CUSTOMER_LOYALTIES}_REJECTED`:
      return { ...state, fetchCustomerLoyalties: REJECTED };

    // Favorites
    case `${FETCH_FAVORITES}_PENDING`:
      return { ...state, fetchFavorites: PENDING };
    case `${FETCH_FAVORITES}_FULFILLED`:
      return { ...state, fetchFavorites: FULFILLED };
    case `${FETCH_FAVORITES}_REJECTED`:
      return { ...state, fetchFavorites: REJECTED };

    case `${CREATE_FAVORITE}_PENDING`:
      return { ...state, createFavorite: PENDING };
    case `${CREATE_FAVORITE}_FULFILLED`:
      return { ...state, createFavorite: FULFILLED };
    case `${CREATE_FAVORITE}_REJECTED`:
      return { ...state, createFavorite: REJECTED };

    case `${UPDATE_FAVORITE}_PENDING`:
      return { ...state, updateFavorite: PENDING };
    case `${UPDATE_FAVORITE}_FULFILLED`:
      return { ...state, updateFavorite: FULFILLED };
    case `${UPDATE_FAVORITE}_REJECTED`:
      return { ...state, updateFavorite: REJECTED };

    case `${DELETE_FAVORITE}_PENDING`:
      return { ...state, deleteFavorite: PENDING };
    case `${DELETE_FAVORITE}_FULFILLED`:
      return { ...state, deleteFavorite: FULFILLED };
    case `${DELETE_FAVORITE}_REJECTED`:
      return { ...state, deleteFavorite: REJECTED };

    case `${FETCH_RATING}_PENDING`:
      return { ...state, fetchRating: PENDING };
    case `${FETCH_RATING}_FULFILLED`:
      return { ...state, fetchRating: FULFILLED };
    case `${FETCH_RATING}_REJECTED`:
      return { ...state, fetchRating: REJECTED };

    case `${CREATE_RATING}_PENDING`:
      return { ...state, createRating: PENDING };
    case `${CREATE_RATING}_FULFILLED`:
      return { ...state, createRating: FULFILLED };
    case `${CREATE_RATING}_REJECTED`:
      return { ...state, createRating: REJECTED };

    case `${UPDATE_RATING}_PENDING`:
      return { ...state, updateRating: PENDING };
    case `${UPDATE_RATING}_FULFILLED`:
      return { ...state, updateRating: FULFILLED };
    case `${UPDATE_RATING}_REJECTED`:
      return { ...state, updateRating: REJECTED };

    case `${DELETE_RATING}_PENDING`:
      return { ...state, deleteRating: PENDING };
    case `${DELETE_RATING}_FULFILLED`:
      return { ...state, deleteRating: FULFILLED };
    case `${DELETE_RATING}_REJECTED`:
      return { ...state, deleteRating: REJECTED };

    case `${VALIDATE_USER}_PENDING`:
      return { ...state, validateUser: PENDING };
    case `${VALIDATE_USER}_FULFILLED`:
      return { ...state, validateUser: FULFILLED };
    case `${VALIDATE_USER}_REJECTED`:
      return { ...state, validateUser: REJECTED };

    case `${ADD_ALLERGENS}_PENDING`:
      return { ...state, addAllergens: PENDING };
    case `${ADD_ALLERGENS}_FULFILLED`:
      return { ...state, addAllergens: FULFILLED };
    case `${ADD_ALLERGENS}_REJECTED`:
      return { ...state, addAllergens: REJECTED };

    case `${REMOVE_ALLERGENS}_PENDING`:
      return { ...state, removeAllergens: PENDING };
    case `${REMOVE_ALLERGENS}_FULFILLED`:
      return { ...state, removeAllergens: FULFILLED };
    case `${REMOVE_ALLERGENS}_REJECTED`:
      return { ...state, removeAllergens: REJECTED };

    case `${AUTHENTICATE_USER}_PENDING`:
      return { ...state, authenticateUser: PENDING };
    case `${AUTHENTICATE_USER}_FULFILLED`:
      return { ...state, authenticateUser: FULFILLED };
    case `${AUTHENTICATE_USER}_REJECTED`:
      return { ...state, authenticateUser: REJECTED };

    case `${RESOLVE_USER}_PENDING`:
      return { ...state, resolveUser: PENDING };
    case `${RESOLVE_USER}_FULFILLED`:
      return { ...state, resolveUser: FULFILLED };
    case `${RESOLVE_USER}_REJECTED`:
      return { ...state, resolveUser: REJECTED };

    case `${FETCH_LEVELUP_LOYALTY}_PENDING`:
      return { ...state, fetchLevelUpLoyalty: PENDING };
    case `${FETCH_LEVELUP_LOYALTY}_FULFILLED`:
      return { ...state, fetchLevelUpLoyalty: FULFILLED };
    case `${FETCH_LEVELUP_LOYALTY}_REJECTED`:
      return { ...state, fetchLevelUpLoyalty: REJECTED };

    case `${FETCH_LEVELUP_QR_CODE}_PENDING`:
      return { ...state, fetchLevelUpQRCode: PENDING };
    case `${FETCH_LEVELUP_QR_CODE}_FULFILLED`:
      return { ...state, fetchLevelUpQRCode: FULFILLED };
    case `${FETCH_LEVELUP_QR_CODE}_REJECTED`:
      return { ...state, fetchLevelUpQRCode: REJECTED };

    case `${UPDATE_LEVELUP_CONNECTION}_PENDING`:
      return { ...state, updateLevelUpConnection: PENDING };
    case `${UPDATE_LEVELUP_CONNECTION}_FULFILLED`:
      return { ...state, updateLevelUpConnection: FULFILLED };
    case `${UPDATE_LEVELUP_CONNECTION}_REJECTED`:
      return { ...state, updateLevelUpConnection: REJECTED };

    case `${CONNECT_LEVELUP}_PENDING`:
      return { ...state, connectLevelUp: PENDING };
    case `${CONNECT_LEVELUP}_FULFILLED`:
      return { ...state, connectLevelUp: FULFILLED };
    case `${CONNECT_LEVELUP}_REJECTED`:
      return { ...state, connectLevelUp: REJECTED };

    case `${DISCONNECT_LEVELUP}_PENDING`:
      return { ...state, disconnectLevelUp: PENDING };
    case `${DISCONNECT_LEVELUP}_FULFILLED`:
      return { ...state, disconnectLevelUp: FULFILLED };
    case `${DISCONNECT_LEVELUP}_REJECTED`:
      return { ...state, disconnectLevelUp: REJECTED };

    case `${FETCH_LEVELUP_PAYMENT_METHOD}_PENDING`:
      return { ...state, fetchLevelUpPaymentMethod: PENDING };
    case `${FETCH_LEVELUP_PAYMENT_METHOD}_FULFILLED`:
      return { ...state, fetchLevelUpPaymentMethod: FULFILLED };
    case `${FETCH_LEVELUP_PAYMENT_METHOD}_REJECTED`:
      return { ...state, fetchLevelUpPaymentMethod: REJECTED };

    case `${VALIDATE_CURRENT_CART}_PENDING`:
      return { ...state, validateCurrentCart: PENDING };
    case `${VALIDATE_CURRENT_CART}_FULFILLED`:
      return { ...state, validateCurrentCart: FULFILLED };
    case `${VALIDATE_CURRENT_CART}_REJECTED`:
      return { ...state, validateCurrentCart: REJECTED };

    case `${VALIDATE_CURRENT_ORDER}_PENDING`:
      return { ...state, validateCurrentOrder: PENDING };
    case `${VALIDATE_CURRENT_ORDER}_FULFILLED`:
      return { ...state, validateCurrentOrder: FULFILLED };
    case `${VALIDATE_CURRENT_ORDER}_REJECTED`:
      return { ...state, validateCurrentOrder: REJECTED };

    case `${UNAUTHENTICATE_USER}_PENDING`:
      return { ...state, unauthenticateUser: PENDING };
    case `${UNAUTHENTICATE_USER}_FULFILLED`:
      return { ...state, unauthenticateUser: FULFILLED };
    case `${UNAUTHENTICATE_USER}_REJECTED`:
      return { ...state, unauthenticateUser: REJECTED };

    case `${RESET_USER_PASSWORD}_PENDING`:
      return { ...state, resetUserPassword: PENDING };
    case `${RESET_USER_PASSWORD}_FULFILLED`:
      return { ...state, resetUserPassword: FULFILLED };
    case `${RESET_USER_PASSWORD}_REJECTED`:
      return { ...state, resetUserPassword: REJECTED };

    case `${FINISH_RESET_USER_PASSWORD}_PENDING`:
      return { ...state, finishResetUserPassword: PENDING };
    case `${FINISH_RESET_USER_PASSWORD}_FULFILLED`:
      return { ...state, finishResetUserPassword: FULFILLED };
    case `${FINISH_RESET_USER_PASSWORD}_REJECTED`:
      return { ...state, finishResetUserPassword: REJECTED };

    case `${RESET_LEVELUP_PASSWORD}_PENDING`:
      return { ...state, resetLevelUpPassword: PENDING };
    case `${RESET_LEVELUP_PASSWORD}_FULFILLED`:
      return { ...state, resetLevelUpPassword: FULFILLED };
    case `${RESET_LEVELUP_PASSWORD}_REJECTED`:
      return { ...state, resetLevelUpPassword: REJECTED };

    case `${FETCH_USER}_PENDING`:
      return { ...state, fetchUser: PENDING };
    case `${FETCH_USER}_FULFILLED`:
      return { ...state, fetchUser: FULFILLED };
    case `${FETCH_USER}_REJECTED`:
      return { ...state, fetchUser: REJECTED };

    case `${UPDATE_USER}_PENDING`:
      return { ...state, updateUser: PENDING };
    case `${UPDATE_USER}_FULFILLED`:
      return { ...state, updateUser: FULFILLED };
    case `${UPDATE_USER}_REJECTED`:
      return { ...state, updateUser: REJECTED };

    case `${CREATE_USER}_PENDING`:
      return { ...state, createUser: PENDING };
    case `${CREATE_USER}_FULFILLED`:
      return { ...state, createUser: FULFILLED };
    case `${CREATE_USER}_REJECTED`:
      return { ...state, createUser: REJECTED };

    case `${CREATE_AND_AUTHENTICATE_USER}_PENDING`:
      return { ...state, createAndAuthenticateUser: PENDING };
    case `${CREATE_AND_AUTHENTICATE_USER}_FULFILLED`:
      return { ...state, createAndAuthenticateUser: FULFILLED };
    case `${CREATE_AND_AUTHENTICATE_USER}_REJECTED`:
      return { ...state, createAndAuthenticateUser: REJECTED };

    case `${ATTEMPT_REORDER}_PENDING`:
      return { ...state, attemptReorder: PENDING };
    case `${ATTEMPT_REORDER}_FULFILLED`:
      return { ...state, attemptReorder: FULFILLED };
    case `${ATTEMPT_REORDER}_REJECTED`:
      return { ...state, attemptReorder: REJECTED };

    case `${RESET_APPLICATION}_PENDING`:
      return { ...state, resetApplication: PENDING };
    case `${RESET_APPLICATION}_REJECTED`:
      return { ...state, resetApplication: REJECTED };

    default:
      return state;
  }
};
