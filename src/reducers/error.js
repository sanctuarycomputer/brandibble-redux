// setup
import {
  SEND_SUPPORT_TICKET,
  SETUP_BRANDIBBLE,
  SETUP_BRANDIBBLE_REDUX,
  RESET_APPLICATION,
} from '../actions/application';

// addresses
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  FETCH_ADDRESSES,
} from '../actions/session/addresses';

// allergens
import { FETCH_ALLERGENS } from '../actions/data/allergens';

// menu
import { FETCH_MENU } from '../actions/session/menus';

// favorites
import {
  CREATE_FAVORITE,
  DELETE_FAVORITE,
  FETCH_FAVORITES,
  UPDATE_FAVORITE,
} from '../actions/session/favorites';

// orders
import {
  ADD_LINE_ITEM,
  RESOLVE_ORDER,
  SUBMIT_ORDER,
  VALIDATE_CURRENT_CART,
  VALIDATE_CURRENT_ORDER,
  SET_LINE_ITEM_MADE_FOR,
  SET_PAYMENT_METHOD,
  SET_LINE_ITEM_INSTRUCTIONS,
} from '../actions/session/order';

// locations
import {
  FETCH_LOCATION,
  FETCH_LOCATIONS,
} from '../actions/data/locations';

// geolocations
import {
  FETCH_GEOLOCATIONS,
} from '../actions/data/geolocations';

//  payments
import {
  FETCH_PAYMENTS,
  CREATE_PAYMENT,
  DELETE_PAYMENT,
  SET_DEFAULT_PAYMENT,
} from '../actions/session/payments';

// customerOrders
import {
  FETCH_ALL_CUSTOMER_ORDERS,
  FETCH_PAST_CUSTOMER_ORDERS,
  FETCH_UPCOMING_CUSTOMER_ORDERS,
} from '../actions/data/customerOrders';

// user
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
  RESET_USER_PASSWORD,
  FINISH_RESET_USER_PASSWORD,
  RESET_LEVELUP_PASSWORD,
  RESOLVE_USER,
  UNAUTHENTICATE_USER,
  VALIDATE_USER,
  ADD_ALLERGENS,
  REMOVE_ALLERGENS,
} from '../actions/session/user';

// ratings
import {
  FETCH_RATING,
  CREATE_RATING,
  UPDATE_RATING,
  DELETE_RATING,
} from '../actions/session/ratings';

export const initialState = {
  // application
  sendSupportTicket: null,
  setupBrandibble: null,
  setupBrandibbleRedux: null,
  resetApplication: null,
  // allergens
  fetchAllergens: null,
  addAllergens: null,
  removeAllergens: null,
  // customer orders
  fetchAllCustomerOrders: null,
  fetchPastCustomerOrders: null,
  fetchUpcomingCustomerOrders: null,
  // addresses
  fetchAddresses: null,
  createAddress: null,
  deleteAddress: null,
  // locations
  fetchLocation: null,
  fetchLocations: null,
  // geolocations
  fetchGeolocations: null,
  // menu
  fetchMenu: null,
  // orders
  addLineItem: null,
  resolveOrder: null,
  submitOrder: null,
  setLineItemMadeFor: null,
  setLineItemInstructions: null,
  // payments
  fetchPayments: null,
  createPayment: null,
  deletePayment: null,
  setPaymentMethod: null,
  setDefaultPayment: null,
  // favorites
  fetchFavorites: null,
  createFavorite: null,
  updateFavorite: null,
  deleteFavorite: null,
  // ratings
  fetchRating: null,
  createRating: null,
  updateRating: null,
  deleteRating: null,
  // user
  authenticateUser: null,
  createUser: null,
  createAndAuthenticateUser: null,
  fetchLevelUpLoyalty: null,
  fetchLevelUpQRCode: null,
  updateLevelUpConnection: null,
  connectLevelUp: null,
  disconnectLevelUp: null,
  fetchLevelUpPaymentMethod: null,
  fetchUser: null,
  resetUserPassword: null,
  finishResetUserPassword: null,
  resetLevelUpPassword: null,
  resolveUser: null,
  unauthenticateUser: null,
  updateUser: null,
  validateUser: null,
  validateCurrentCart: null,
  validateCurrentOrder: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // application
    case `${SETUP_BRANDIBBLE}_PENDING`: return { ...state, setupBrandibble: null };
    case `${SETUP_BRANDIBBLE}_REJECTED`: return { ...state, setupBrandibble: payload };

    case `${SETUP_BRANDIBBLE_REDUX}_PENDING`: return { ...state, setupBrandibbleRedux: null };
    case `${SETUP_BRANDIBBLE_REDUX}_REJECTED`: return { ...state, setupBrandibbleRedux: payload };

    case `${SET_PAYMENT_METHOD}_PENDING`: return { ...state, setPaymentMethod: null };
    case `${SET_PAYMENT_METHOD}_REJECTED`: return { ...state, setPaymentMethod: payload };

    case `${SEND_SUPPORT_TICKET}_PENDING`: return { ...state, sendSupportTicket: null };
    case `${SEND_SUPPORT_TICKET}_REJECTED`: return { ...state, sendSupportTicket: payload };

    // customer orders
    case `${FETCH_ALL_CUSTOMER_ORDERS}_PENDING`: return { ...state, fetchAllCustomerOrders: null };
    case `${FETCH_ALL_CUSTOMER_ORDERS}_REJECTED`: return { ...state, fetchAllCustomerOrders: payload };

    case `${FETCH_PAST_CUSTOMER_ORDERS}_PENDING`: return { ...state, fetchPastCustomerOrders: null };
    case `${FETCH_PAST_CUSTOMER_ORDERS}_REJECTED`: return { ...state, fetchPastCustomerOrders: payload };

    case `${FETCH_UPCOMING_CUSTOMER_ORDERS}_PENDING`: return { ...state, fetchUpcomingCustomerOrders: null };
    case `${FETCH_UPCOMING_CUSTOMER_ORDERS}_REJECTED`: return { ...state, fetchUpcomingCustomerOrders: payload };

    // allergens
    case `${FETCH_ALLERGENS}_PENDING`: return { ...state, fetchAllergens: null };
    case `${FETCH_ALLERGENS}_REJECTED`: return { ...state, fetchAllergens: payload };

    // addresses
    case `${FETCH_ADDRESSES}_PENDING`: return { ...state, fetchAddresses: null };
    case `${FETCH_ADDRESSES}_REJECTED`: return { ...state, fetchAddresses: payload };

    case `${CREATE_ADDRESS}_PENDING`: return { ...state, createAddress: null };
    case `${CREATE_ADDRESS}_REJECTED`: return { ...state, createAddress: payload };

    case `${DELETE_ADDRESS}_PENDING`: return { ...state, deleteAddress: null };
    case `${DELETE_ADDRESS}_REJECTED`: return { ...state, deleteAddress: payload };

    // locations
    case `${FETCH_LOCATIONS}_PENDING`: return { ...state, fetchLocations: null };
    case `${FETCH_LOCATIONS}_REJECTED`: return { ...state, fetchLocations: payload };

    case `${FETCH_LOCATION}_PENDING`: return { ...state, fetchLocation: null };
    case `${FETCH_LOCATION}_REJECTED`: return { ...state, fetchLocation: payload };

    // geolocations
    case `${FETCH_GEOLOCATIONS}_PENDING`: return { ...state, fetchGeolocations: null };
    case `${FETCH_GEOLOCATIONS}_REJECTED`: return { ...state, fetchGeolocations: payload };

    // menu
    case `${FETCH_MENU}_PENDING`: return { ...state, fetchMenu: null };
    case `${FETCH_MENU}_REJECTED`: return { ...state, fetchMenu: payload };

    // orders
    case `${RESOLVE_ORDER}_PENDING`: return { ...state, resolveOrder: null };
    case `${RESOLVE_ORDER}_REJECTED`: return { ...state, resolveOrder: payload };

    case `${ADD_LINE_ITEM}_PENDING`: return { ...state, addLineItem: null };
    case `${ADD_LINE_ITEM}_REJECTED`: return { ...state, addLineItem: payload };

    case `${SUBMIT_ORDER}_PENDING`: return { ...state, submitOrder: null };
    case `${SUBMIT_ORDER}_REJECTED`: return { ...state, submitOrder: payload };

    case `${VALIDATE_CURRENT_CART}_PENDING`: return { ...state, validateCurrentCart: null };
    case `${VALIDATE_CURRENT_CART}_REJECTED`: return { ...state, validateCurrentCart: payload };

    case `${VALIDATE_CURRENT_ORDER}_PENDING`: return { ...state, validateCurrentOrder: null };
    case `${VALIDATE_CURRENT_ORDER}_REJECTED`: return { ...state, validateCurrentOrder: payload };

    case `${SET_LINE_ITEM_MADE_FOR}_PENDING`: return { ...state, setLineItemMadeFor: null };
    case `${SET_LINE_ITEM_MADE_FOR}_REJECTED`: return { ...state, setLineItemMadeFor: payload };

    case `${SET_LINE_ITEM_INSTRUCTIONS}_PENDING`: return { ...state, setLineItemInstructions: null };
    case `${SET_LINE_ITEM_INSTRUCTIONS}_REJECTED`: return { ...state, setLineItemInstructions: payload };

    // payments
    case `${FETCH_PAYMENTS}_PENDING`: return { ...state, fetchPayments: null };
    case `${FETCH_PAYMENTS}_REJECTED`: return { ...state, fetchPayments: payload };

    case `${CREATE_PAYMENT}_PENDING`: return { ...state, createPayment: null };
    case `${CREATE_PAYMENT}_REJECTED`: return { ...state, createPayment: payload };

    case `${DELETE_PAYMENT}_PENDING`: return { ...state, deletePayment: null };
    case `${DELETE_PAYMENT}_REJECTED`: return { ...state, deletePayment: payload };

    case `${SET_DEFAULT_PAYMENT}_PENDING`: return { ...state, setDefaultPayment: null };
    case `${SET_DEFAULT_PAYMENT}_REJECTED`: return { ...state, setDefaultPayment: payload };

    // favorites
    case `${FETCH_FAVORITES}_PENDING`: return { ...state, fetchFavorites: null };
    case `${FETCH_FAVORITES}_REJECTED`: return { ...state, fetchFavorites: payload };

    case `${CREATE_FAVORITE}_PENDING`: return { ...state, createFavorite: null };
    case `${CREATE_FAVORITE}_REJECTED`: return { ...state, createFavorite: payload };

    case `${UPDATE_FAVORITE}_PENDING`: return { ...state, updateFavorite: null };
    case `${UPDATE_FAVORITE}_REJECTED`: return { ...state, updateFavorite: payload };

    case `${DELETE_FAVORITE}_PENDING`: return { ...state, deleteFavorite: null };
    case `${DELETE_FAVORITE}_REJECTED`: return { ...state, deleteFavorite: payload };

    // ratings
    case `${FETCH_RATING}_PENDING`: return { ...state, fetchRating: null };
    case `${FETCH_RATING}_REJECTED`: return { ...state, fetchRating: payload };

    case `${CREATE_RATING}_PENDING`: return { ...state, createRating: null };
    case `${CREATE_RATING}_REJECTED`: return { ...state, createRating: payload };

    case `${UPDATE_RATING}_PENDING`: return { ...state, updateRating: null };
    case `${UPDATE_RATING}_REJECTED`: return { ...state, updateRating: payload };

    case `${DELETE_RATING}_PENDING`: return { ...state, deleteRating: null };
    case `${DELETE_RATING}_REJECTED`: return { ...state, deleteRating: payload };

    // users
    case `${CREATE_AND_AUTHENTICATE_USER}_PENDING`: return { ...state, createAndAuthenticateUser: null };
    case `${CREATE_AND_AUTHENTICATE_USER}_REJECTED`: return { ...state, createAndAuthenticateUser: payload };

    case `${AUTHENTICATE_USER}_PENDING`: return { ...state, authenticateUser: null };
    case `${AUTHENTICATE_USER}_REJECTED`: return { ...state, authenticateUser: payload };

    case `${ADD_ALLERGENS}_PENDING`: return { ...state, addAllergens: null };
    case `${ADD_ALLERGENS}_FULFILLED`: return { ...state, addAllergens: payload };
    case `${ADD_ALLERGENS}_REJECTED`: return { ...state, addAllergens: payload };

    case `${REMOVE_ALLERGENS}_PENDING`: return { ...state, removeAllergens: null };
    case `${REMOVE_ALLERGENS}_FULFILLED`: return { ...state, removeAllergens: payload };
    case `${REMOVE_ALLERGENS}_REJECTED`: return { ...state, removeAllergens: payload };

    case `${RESOLVE_USER}_PENDING`: return { ...state, resolveUser: null };
    case `${RESOLVE_USER}_REJECTED`: return { ...state, resolveUser: payload };

    case `${UNAUTHENTICATE_USER}_PENDING`: return { ...state, unauthenticateUser: null };
    case `${UNAUTHENTICATE_USER}_REJECTED`: return { ...state, unauthenticateUser: payload };

    case `${FETCH_LEVELUP_LOYALTY}_PENDING`: return { ...state, fetchLevelUpLoyalty: null };
    case `${FETCH_LEVELUP_LOYALTY}_REJECTED`: return { ...state, fetchLevelUpLoyalty: payload };

    case `${FETCH_LEVELUP_QR_CODE}_PENDING`: return { ...state, fetchLevelUpQRCode: null };
    case `${FETCH_LEVELUP_QR_CODE}_REJECTED`: return { ...state, fetchLevelUpQRCode: payload };

    case `${UPDATE_LEVELUP_CONNECTION}_PENDING`: return { ...state, updateLevelUpConnection: null };
    case `${UPDATE_LEVELUP_CONNECTION}_REJECTED`: return { ...state, updateLevelUpConnection: payload };

    case `${CONNECT_LEVELUP}_PENDING`: return { ...state, connectLevelUp: null };
    case `${CONNECT_LEVELUP}_REJECTED`: return { ...state, connectLevelUp: payload };

    case `${DISCONNECT_LEVELUP}_PENDING`: return { ...state, disconnectLevelUp: null };
    case `${DISCONNECT_LEVELUP}_REJECTED`: return { ...state, disconnectLevelUp: payload };

    case `${FETCH_LEVELUP_PAYMENT_METHOD}_PENDING`: return { ...state, fetchLevelUpPaymentMethod: null };
    case `${FETCH_LEVELUP_PAYMENT_METHOD}_REJECTED`: return { ...state, fetchLevelUpPaymentMethod: payload };

    case `${VALIDATE_USER}_PENDING`: return { ...state, validateUser: null };
    case `${VALIDATE_USER}_REJECTED`: return { ...state, validateUser: payload };

    case `${RESET_USER_PASSWORD}_PENDING`: return { ...state, resetUserPassword: null };
    case `${RESET_USER_PASSWORD}_REJECTED`: return { ...state, resetUserPassword: payload };

    case `${FINISH_RESET_USER_PASSWORD}_PENDING`: return { ...state, finishResetUserPassword: null };
    case `${FINISH_RESET_USER_PASSWORD}_REJECTED`: return { ...state, finishResetUserPassword: payload };

    case `${RESET_LEVELUP_PASSWORD}_PENDING`: return { ...state, resetLevelUpPassword: null };
    case `${RESET_LEVELUP_PASSWORD}_REJECTED`: return { ...state, resetLevelUpPassword: payload };

    case `${FETCH_USER}_PENDING`: return { ...state, fetchUser: null };
    case `${FETCH_USER}_REJECTED`: return { ...state, fetchUser: payload };

    case `${UPDATE_USER}_PENDING`: return { ...state, updateUser: null };
    case `${UPDATE_USER}_REJECTED`: return { ...state, updateUser: payload };

    case `${CREATE_USER}_PENDING`: return { ...state, createUser: null };
    case `${CREATE_USER}_REJECTED`: return { ...state, createUser: payload };

    case `${RESET_APPLICATION}_PENDING`: return { ...state, resetApplication: null };
    case `${RESET_APPLICATION}_REJECTED`: return { ...state, resetApplication: payload };

    default: return state;
  }
};
