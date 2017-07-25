import reduxCrud from 'redux-crud';

// setup
import {
  SEND_SUPPORT_TICKET,
  SETUP_BRANDIBBLE,
  SETUP_BRANDIBBLE_REDUX,
} from 'actions/application';

// allergens
import { FETCH_ALLERGENS } from 'actions/data/allergens';

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
} from 'actions/session/order';

//  payments
import { SET_DEFAULT_PAYMENT } from 'actions/session/payments';

// customerOrders
import {
  FETCH_ALL_CUSTOMER_ORDERS,
  FETCH_PAST_CUSTOMER_ORDERS,
  FETCH_UPCOMING_CUSTOMER_ORDERS,
} from 'actions/data/customerOrders';

// locations
import {
  FETCH_LOCATION,
  FETCH_LOCATIONS,
} from 'actions/data/locations';

// user
import {
  AUTHENTICATE_USER,
  FETCH_LEVELUP_LOYALTY,
  FETCH_LEVELUP_QR_CODE,
  UPDATE_LEVELUP_CONNECTION,
  CONNECT_LEVELUP,
  DISCONNECT_LEVELUP,
  FETCH_LEVELUP_PAYMENT_METHOD,
  FETCH_USER,
  RESET_USER_PASSWORD,
  RESET_LEVELUP_PASSWORD,
  RESOLVE_USER,
  UNAUTHENTICATE_USER,
  VALIDATE_USER,
  ADD_ALLERGENS,
  REMOVE_ALLERGENS,
} from 'actions/session/user';

const {
  USER_UPDATE_START,
  USER_UPDATE_ERROR,
  USER_CREATE_START,
  USER_CREATE_ERROR,
} = reduxCrud.actionTypesFor('user');

// addresses
const {
  ADDRESSES_FETCH_START,
  ADDRESSES_FETCH_ERROR,
  ADDRESSES_CREATE_START,
  ADDRESSES_CREATE_ERROR,
  ADDRESSES_DELETE_START,
  ADDRESSES_DELETE_ERROR,
} = reduxCrud.actionTypesFor('addresses');

// menu
const {
  MENUS_FETCH_START,
  MENUS_FETCH_ERROR,
} = reduxCrud.actionTypesFor('menus');

// payments
const {
  PAYMENTS_FETCH_START,
  PAYMENTS_FETCH_ERROR,
  PAYMENTS_CREATE_START,
  PAYMENTS_CREATE_ERROR,
  PAYMENTS_DELETE_START,
  PAYMENTS_DELETE_ERROR,
} = reduxCrud.actionTypesFor('payments');

// favorites
const {
  FAVORITES_FETCH_START,
  FAVORITES_FETCH_ERROR,
  FAVORITES_CREATE_START,
  FAVORITES_CREATE_ERROR,
  FAVORITES_UPDATE_START,
  FAVORITES_UPDATE_ERROR,
  FAVORITES_DELETE_START,
  FAVORITES_DELETE_ERROR,
} = reduxCrud.actionTypesFor('favorites');

// ratings
const {
  RATINGS_FETCH_START,
  RATINGS_FETCH_ERROR,
  RATINGS_CREATE_START,
  RATINGS_CREATE_ERROR,
  RATINGS_UPDATE_START,
  RATINGS_UPDATE_ERROR,
  RATINGS_DELETE_START,
  RATINGS_DELETE_ERROR,
} = reduxCrud.actionTypesFor('ratings');

export const initialState = {
  // application
  sendSupportTicket: null,
  setupBrandibble: null,
  setupBrandibbleRedux: null,
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
  fetchLevelUpLoyalty: null,
  fetchLevelUpQRCode: null,
  updateLevelUpConnection: null,
  connectLevelUp: null,
  disconnectLevelUp: null,
  fetchLevelUpPaymentMethod: null,
  fetchUser: null,
  resetUserPassword: null,
  resetLevelUpPassword: null,
  resolveUser: null,
  unauthenticateUser: null,
  updateUser: null,
  validateUser: null,
  validateCurrentCart: null,
  validateCurrentOrder: null,
};

export default function error(state = initialState, action) {
  switch (action.type) {
    // application
    case `${SETUP_BRANDIBBLE}_PENDING`: return { ...state, setupBrandibble: null };
    case `${SETUP_BRANDIBBLE}_REJECTED`: return { ...state, setupBrandibble: action.payload };

    case `${SETUP_BRANDIBBLE_REDUX}_PENDING`: return { ...state, setupBrandibbleRedux: null };
    case `${SETUP_BRANDIBBLE_REDUX}_REJECTED`: return { ...state, setupBrandibbleRedux: action.payload };

    case `${SET_PAYMENT_METHOD}_PENDING`: return { ...state, setPaymentMethod: null };
    case `${SET_PAYMENT_METHOD}_REJECTED`: return { ...state, setPaymentMethod: action.payload };

    case `${SEND_SUPPORT_TICKET}_PENDING`: return { ...state, sendSupportTicket: null };
    case `${SEND_SUPPORT_TICKET}_REJECTED`: return { ...state, sendSupportTicket: action.payload };

    // customer orders
    case `${FETCH_ALL_CUSTOMER_ORDERS}_PENDING`: return { ...state, fetchAllCustomerOrders: null };
    case `${FETCH_ALL_CUSTOMER_ORDERS}_REJECTED`: return { ...state, fetchAllCustomerOrders: action.payload };

    case `${FETCH_PAST_CUSTOMER_ORDERS}_PENDING`: return { ...state, fetchPastCustomerOrders: null };
    case `${FETCH_PAST_CUSTOMER_ORDERS}_REJECTED`: return { ...state, fetchPastCustomerOrders: action.payload };

    case `${FETCH_UPCOMING_CUSTOMER_ORDERS}_PENDING`: return { ...state, fetchUpcomingCustomerOrders: null };
    case `${FETCH_UPCOMING_CUSTOMER_ORDERS}_REJECTED`: return { ...state, fetchUpcomingCustomerOrders: action.payload };

    // allergens
    case `${FETCH_ALLERGENS}_PENDING`: return { ...state, fetchAllergens: null };
    case `${FETCH_ALLERGENS}_REJECTED`: return { ...state, fetchAllergens: action.payload };

    // addresses
    case ADDRESSES_FETCH_START: return { ...state, fetchAddresses: null };
    case ADDRESSES_FETCH_ERROR: return { ...state, fetchAddresses: action.error };

    case ADDRESSES_CREATE_START: return { ...state, createAddress: null };
    case ADDRESSES_CREATE_ERROR: return { ...state, createAddress: action.error };

    case ADDRESSES_DELETE_START: return { ...state, deleteAddress: null };
    case ADDRESSES_DELETE_ERROR: return { ...state, deleteAddress: action.error };

    // locations
    case `${FETCH_LOCATIONS}_PENDING`: return { ...state, fetchLocations: null };
    case `${FETCH_LOCATIONS}_REJECTED`: return { ...state, fetchLocations: action.payload };

    case `${FETCH_LOCATION}_PENDING`: return { ...state, fetchLocation: null };
    case `${FETCH_LOCATION}_REJECTED`: return { ...state, fetchLocation: action.payload };

    // menu
    case MENUS_FETCH_START: return { ...state, fetchMenu: null };
    case MENUS_FETCH_ERROR: return { ...state, fetchMenu: action.error };

    // orders
    case `${RESOLVE_ORDER}_PENDING`: return { ...state, resolveOrder: null };
    case `${RESOLVE_ORDER}_REJECTED`: return { ...state, resolveOrder: action.payload };

    case `${ADD_LINE_ITEM}_PENDING`: return { ...state, addLineItem: null };
    case `${ADD_LINE_ITEM}_REJECTED`: return { ...state, addLineItem: action.payload };

    case `${SUBMIT_ORDER}_PENDING`: return { ...state, submitOrder: null };
    case `${SUBMIT_ORDER}_REJECTED`: return { ...state, submitOrder: action.payload };

    case `${VALIDATE_CURRENT_CART}_PENDING`: return { ...state, validateCurrentCart: null };
    case `${VALIDATE_CURRENT_CART}_REJECTED`: return { ...state, validateCurrentCart: action.payload };

    case `${VALIDATE_CURRENT_ORDER}_PENDING`: return { ...state, validateCurrentOrder: null };
    case `${VALIDATE_CURRENT_ORDER}_REJECTED`: return { ...state, validateCurrentOrder: action.payload };

    case `${SET_LINE_ITEM_MADE_FOR}_PENDING`: return { ...state, setLineItemMadeFor: null };
    case `${SET_LINE_ITEM_MADE_FOR}_REJECTED`: return { ...state, setLineItemMadeFor: action.payload };

    case `${SET_LINE_ITEM_INSTRUCTIONS}_PENDING`: return { ...state, setLineItemInstructions: null };
    case `${SET_LINE_ITEM_INSTRUCTIONS}_REJECTED`: return { ...state, setLineItemInstructions: action.payload };

    // payments
    case PAYMENTS_FETCH_START: return { ...state, fetchPayments: null };
    case PAYMENTS_FETCH_ERROR: return { ...state, fetchPayments: action.error };

    case PAYMENTS_CREATE_START: return { ...state, createPayment: null };
    case PAYMENTS_CREATE_ERROR: return { ...state, createPayment: action.error };

    case PAYMENTS_DELETE_START: return { ...state, deletePayment: null };
    case PAYMENTS_DELETE_ERROR: return { ...state, deletePayment: action.error };

    case `${SET_DEFAULT_PAYMENT}_PENDING`: return { ...state, setDefaultPayment: null };
    case `${SET_DEFAULT_PAYMENT}_REJECTED`: return { ...state, setDefaultPayment: action.payload };

    // favorites
    case FAVORITES_FETCH_START: return { ...state, fetchFavorites: null };
    case FAVORITES_FETCH_ERROR: return { ...state, fetchFavorites: action.error };

    case FAVORITES_CREATE_START: return { ...state, createFavorite: null };
    case FAVORITES_CREATE_ERROR: return { ...state, createFavorite: action.error };

    case FAVORITES_UPDATE_START: return { ...state, updateFavorite: null };
    case FAVORITES_UPDATE_ERROR: return { ...state, updateFavorite: action.error };

    case FAVORITES_DELETE_START: return { ...state, deleteFavorite: null };
    case FAVORITES_DELETE_ERROR: return { ...state, deleteFavorite: action.error };

    // ratings
    case RATINGS_FETCH_START: return { ...state, fetchRating: null };
    case RATINGS_FETCH_ERROR: return { ...state, fetchRating: action.error };

    case RATINGS_CREATE_START: return { ...state, createRating: null };
    case RATINGS_CREATE_ERROR: return { ...state, createRating: action.error };

    case RATINGS_UPDATE_START: return { ...state, updateRating: null };
    case RATINGS_UPDATE_ERROR: return { ...state, updateRating: action.error };

    case RATINGS_DELETE_START: return { ...state, deleteRating: null };
    case RATINGS_DELETE_ERROR: return { ...state, deleteRating: action.error };

    // users
    case `${AUTHENTICATE_USER}_PENDING`: return { ...state, authenticateUser: null };
    case `${AUTHENTICATE_USER}_REJECTED`: return { ...state, authenticateUser: action.payload };

    case `${ADD_ALLERGENS}_PENDING`: return { ...state, addAllergens: null };
    case `${ADD_ALLERGENS}_FULFILLED`: return { ...state, addAllergens: action.payload };
    case `${ADD_ALLERGENS}_REJECTED`: return { ...state, addAllergens: action.error };

    case `${REMOVE_ALLERGENS}_PENDING`: return { ...state, removeAllergens: null };
    case `${REMOVE_ALLERGENS}_FULFILLED`: return { ...state, removeAllergens: action.payload };
    case `${REMOVE_ALLERGENS}_REJECTED`: return { ...state, removeAllergens: action.error };

    case `${RESOLVE_USER}_PENDING`: return { ...state, resolveUser: null };
    case `${RESOLVE_USER}_REJECTED`: return { ...state, resolveUser: action.payload };

    case `${UNAUTHENTICATE_USER}_PENDING`: return { ...state, unauthenticateUser: null };
    case `${UNAUTHENTICATE_USER}_REJECTED`: return { ...state, unauthenticateUser: action.payload };

    case `${FETCH_LEVELUP_LOYALTY}_PENDING`: return { ...state, fetchLevelUpLoyalty: null };
    case `${FETCH_LEVELUP_LOYALTY}_REJECTED`: return { ...state, fetchLevelUpLoyalty: action.payload };

    case `${FETCH_LEVELUP_QR_CODE}_PENDING`: return { ...state, fetchLevelUpQRCode: null };
    case `${FETCH_LEVELUP_QR_CODE}_REJECTED`: return { ...state, fetchLevelUpQRCode: action.payload };

    case `${UPDATE_LEVELUP_CONNECTION}_PENDING`: return { ...state, updateLevelUpConnection: null };
    case `${UPDATE_LEVELUP_CONNECTION}_REJECTED`: return { ...state, updateLevelUpConnection: action.payload };

    case `${CONNECT_LEVELUP}_PENDING`: return { ...state, connectLevelUp: null };
    case `${CONNECT_LEVELUP}_REJECTED`: return { ...state, connectLevelUp: action.payload };

    case `${DISCONNECT_LEVELUP}_PENDING`: return { ...state, disconnectLevelUp: null };
    case `${DISCONNECT_LEVELUP}_REJECTED`: return { ...state, disconnectLevelUp: action.payload };

    case `${FETCH_LEVELUP_PAYMENT_METHOD}_PENDING`: return { ...state, fetchLevelUpPaymentMethod: null };
    case `${FETCH_LEVELUP_PAYMENT_METHOD}_REJECTED`: return { ...state, fetchLevelUpPaymentMethod: action.payload };

    case `${VALIDATE_USER}_PENDING`: return { ...state, validateUser: null };
    case `${VALIDATE_USER}_REJECTED`: return { ...state, validateUser: action.payload };

    case `${RESET_USER_PASSWORD}_PENDING`: return { ...state, resetUserPassword: null };
    case `${RESET_USER_PASSWORD}_REJECTED`: return { ...state, resetUserPassword: action.payload };

    case `${RESET_LEVELUP_PASSWORD}_PENDING`: return { ...state, resetLevelUpPassword: null };
    case `${RESET_LEVELUP_PASSWORD}_REJECTED`: return { ...state, resetLevelUpPassword: action.payload };

    case `${FETCH_USER}_PENDING`: return { ...state, fetchUser: null };
    case `${FETCH_USER}_REJECTED`: return { ...state, fetchUser: action.payload };

    case USER_UPDATE_START: return { ...state, updateUser: null };
    case USER_UPDATE_ERROR: return { ...state, updateUser: action.error };

    case USER_CREATE_START: return { ...state, createUser: null };
    case USER_CREATE_ERROR: return { ...state, createUser: action.error };

    default: return state;
  }
}
