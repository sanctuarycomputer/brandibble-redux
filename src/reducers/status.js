import reduxCrud from 'redux-crud';
// TODO: this reducer is untested
import {
  SEND_SUPPORT_TICKET,
  SETUP_BRANDIBBLE,
  SETUP_BRANDIBBLE_REDUX,
} from '../actions/application';
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  FETCH_ADDRESSES,
} from '../actions/session/addresses';
import { FETCH_ALLERGENS } from '../actions/data/allergens';
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
import {
  ADD_LINE_ITEM,
  RESOLVE_ORDER,
  SET_ORDER_LOCATION_ID,
  SUBMIT_ORDER,
  SET_PROMO_CODE,
  VALIDATE_CURRENT_CART,
  VALIDATE_CURRENT_ORDER,
  SET_REQUESTED_AT,
  CREATE_NEW_ORDER,
  SET_LINE_ITEM_MADE_FOR,
  SET_LINE_ITEM_INSTRUCTIONS,
  SET_PAYMENT_METHOD,
} from '../actions/session/order';
import {
  FETCH_LOCATIONS,
  FETCH_LOCATION,
} from '../actions/data/locations';
import {
  FETCH_GEOLOCATIONS,
} from '../actions/data/geolocations';
import {
  AUTHENTICATE_USER,
  FETCH_LEVELUP_LOYALTY,
  FETCH_LEVELUP_CAMPAIGN,
  FETCH_LEVELUP_QR_CODE,
  UPDATE_LEVELUP_CONNECTION,
  CONNECT_LEVELUP,
  DISCONNECT_LEVELUP,
  FETCH_LEVELUP_PAYMENT_METHOD,
  FETCH_USER,
  UNAUTHENTICATE_USER,
  RESET_USER_PASSWORD,
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
import { Status } from '../utils/constants';

const {
  FULFILLED,
  IDLE,
  PENDING,
  REJECTED,
} = Status;

const {
  RATINGS_FETCH_START,
  RATINGS_FETCH_SUCCESS,
  RATINGS_FETCH_ERROR,
  RATINGS_CREATE_START,
  RATINGS_CREATE_SUCCESS,
  RATINGS_CREATE_ERROR,
  RATINGS_UPDATE_START,
  RATINGS_UPDATE_SUCCESS,
  RATINGS_UPDATE_ERROR,
  RATINGS_DELETE_START,
  RATINGS_DELETE_SUCCESS,
  RATINGS_DELETE_ERROR,
} = reduxCrud.actionTypesFor('ratings');

const {
  USER_UPDATE_START,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  USER_CREATE_START,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR,
} = reduxCrud.actionTypesFor('user');

const initialState = {
  setupBrandibble: IDLE,
  setupBrandibbleRedux: IDLE,
  sendSupportTicket: IDLE,
  fetchAddresses: IDLE,
  createAddress: IDLE,
  deleteAddress: IDLE,
  fetchAllergens: IDLE,
  addAllergens: IDLE,
  removeAllergens: IDLE,
  fetchLevelUpLoyalty: IDLE,
  fetchLevelUpQRCode: IDLE,
  updateLevelUpConnection: IDLE,
  connectLevelUp: IDLE,
  fetchLevelUpCampaign: IDLE,
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
  createPayment: IDLE,
  setDefaultPayment: IDLE,
  setPaymentMethod: IDLE,
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
  fetchUser: IDLE,
  resetUserPassword: IDLE,
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
};

export default function status(state = initialState, action) {
  switch (action.type) {
    case `${SETUP_BRANDIBBLE}_PENDING`: return { ...state, setupBrandibble: PENDING };
    case `${SETUP_BRANDIBBLE}_FULFILLED`: return { ...state, setupBrandibble: FULFILLED };
    case `${SETUP_BRANDIBBLE}_REJECTED`: return { ...state, setupBrandibble: REJECTED };

    case `${SETUP_BRANDIBBLE_REDUX}_PENDING`: return { ...state, setupBrandibbleRedux: PENDING };
    case `${SETUP_BRANDIBBLE_REDUX}_FULFILLED`: return { ...state, setupBrandibbleRedux: FULFILLED };
    case `${SETUP_BRANDIBBLE_REDUX}_REJECTED`: return { ...state, setupBrandibbleRedux: REJECTED };

    case `${SEND_SUPPORT_TICKET}_PENDING`: return { ...state, sendSupportTicket: PENDING };
    case `${SEND_SUPPORT_TICKET}_FULFILLED`: return { ...state, sendSupportTicket: FULFILLED };
    case `${SEND_SUPPORT_TICKET}_REJECTED`: return { ...state, sendSupportTicket: REJECTED };

    case `${FETCH_ALLERGENS}_PENDING`: return { ...state, fetchAllergens: PENDING };
    case `${FETCH_ALLERGENS}_FULFILLED`: return { ...state, fetchAllergens: FULFILLED };
    case `${FETCH_ALLERGENS}_REJECTED`: return { ...state, fetchAllergens: REJECTED };

    case `${FETCH_ADDRESSES}_PENDING`: return { ...state, fetchAddresses: PENDING };
    case `${FETCH_ADDRESSES}_FULFILLED`: return { ...state, fetchAddresses: FULFILLED };
    case `${FETCH_ADDRESSES}_REJECTED`: return { ...state, fetchAddresses: REJECTED };

    case `${CREATE_ADDRESS}_PENDING`: return { ...state, createAddress: PENDING };
    case `${CREATE_ADDRESS}_FULFILLED`: return { ...state, createAddress: FULFILLED };
    case `${CREATE_ADDRESS}_REJECTED`: return { ...state, createAddress: REJECTED };

    case `${DELETE_ADDRESS}_PENDING`: return { ...state, deleteAddress: PENDING };
    case `${DELETE_ADDRESS}_FULFILLED`: return { ...state, deleteAddress: FULFILLED };
    case `${DELETE_ADDRESS}_REJECTED`: return { ...state, deleteAddress: REJECTED };

    case `${FETCH_LOCATIONS}_PENDING`: return { ...state, fetchLocations: PENDING };
    case `${FETCH_LOCATIONS}_FULFILLED`: return { ...state, fetchLocations: FULFILLED };
    case `${FETCH_LOCATIONS}_REJECTED`: return { ...state, fetchLocations: REJECTED };

    case `${FETCH_LOCATION}_PENDING`: return { ...state, fetchLocation: PENDING };
    case `${FETCH_LOCATION}_FULFILLED`: return { ...state, fetchLocation: FULFILLED };
    case `${FETCH_LOCATION}_REJECTED`: return { ...state, fetchLocation: REJECTED };

    case `${FETCH_GEOLOCATIONS}_PENDING`: return { ...state, fetchGeolocations: PENDING };
    case `${FETCH_GEOLOCATIONS}_FULFILLED`: return { ...state, fetchGeolocations: FULFILLED };
    case `${FETCH_GEOLOCATIONS}_REJECTED`: return { ...state, fetchGeolocations: REJECTED };

    case `${SET_PAYMENT_METHOD}_PENDING`: return { ...state, setPaymentMethod: PENDING };
    case `${SET_PAYMENT_METHOD}_FULFILLED`: return { ...state, setPaymentMethod: FULFILLED };
    case `${SET_PAYMENT_METHOD}_REJECTED`: return { ...state, setPaymentMethod: REJECTED };

    case `${FETCH_ALL_CUSTOMER_ORDERS}_PENDING`: return { ...state, fetchAllCustomerOrders: PENDING };
    case `${FETCH_ALL_CUSTOMER_ORDERS}_FULFILLED`: return { ...state, fetchAllCustomerOrders: FULFILLED };
    case `${FETCH_ALL_CUSTOMER_ORDERS}_REJECTED`: return { ...state, fetchAllCustomerOrders: REJECTED };

    case `${FETCH_PAST_CUSTOMER_ORDERS}_PENDING`: return { ...state, fetchPastCustomerOrders: PENDING };
    case `${FETCH_PAST_CUSTOMER_ORDERS}_FULFILLED`: return { ...state, fetchPastCustomerOrders: FULFILLED };
    case `${FETCH_PAST_CUSTOMER_ORDERS}_REJECTED`: return { ...state, fetchPastCustomerOrders: REJECTED };

    case `${FETCH_UPCOMING_CUSTOMER_ORDERS}_PENDING`: return { ...state, fetchUpcomingCustomerOrders: PENDING };
    case `${FETCH_UPCOMING_CUSTOMER_ORDERS}_FULFILLED`: return { ...state, fetchUpcomingCustomerOrders: FULFILLED };
    case `${FETCH_UPCOMING_CUSTOMER_ORDERS}_REJECTED`: return { ...state, fetchUpcomingCustomerOrders: REJECTED };

    case `${FETCH_MENU}_PENDING`: return { ...state, fetchMenu: PENDING };
    case `${FETCH_MENU}_FULFILLED`: return { ...state, fetchMenu: FULFILLED };
    case `${FETCH_MENU}_REJECTED`: return { ...state, fetchMenu: REJECTED };

    case `${RESOLVE_ORDER}_PENDING`: return { ...state, resolveOrder: PENDING };
    case `${RESOLVE_ORDER}_FULFILLED`: return { ...state, resolveOrder: FULFILLED };
    case `${RESOLVE_ORDER}_REJECTED`: return { ...state, resolveOrder: REJECTED };

    case `${ADD_LINE_ITEM}_PENDING`: return { ...state, addLineItem: PENDING };
    case `${ADD_LINE_ITEM}_FULFILLED`: return { ...state, addLineItem: FULFILLED };
    case `${ADD_LINE_ITEM}_REJECTED`: return { ...state, addLineItem: REJECTED };

    case `${SET_REQUESTED_AT}_PENDING`: return { ...state, setRequestedAt: PENDING };
    case `${SET_REQUESTED_AT}_FULFILLED`: return { ...state, setRequestedAt: FULFILLED };
    case `${SET_REQUESTED_AT}_REJECTED`: return { ...state, setRequestedAt: REJECTED };

    case `${SET_LINE_ITEM_MADE_FOR}_PENDING`: return { ...state, setLineItemMadeFor: PENDING };
    case `${SET_LINE_ITEM_MADE_FOR}_FULFILLED`: return { ...state, setLineItemMadeFor: FULFILLED };
    case `${SET_LINE_ITEM_MADE_FOR}_REJECTED`: return { ...state, setLineItemMadeFor: REJECTED };

    case `${SET_LINE_ITEM_INSTRUCTIONS}_PENDING`: return { ...state, setLineItemInstructions: PENDING };
    case `${SET_LINE_ITEM_INSTRUCTIONS}_FULFILLED`: return { ...state, setLineItemInstructions: FULFILLED };
    case `${SET_LINE_ITEM_INSTRUCTIONS}_REJECTED`: return { ...state, setLineItemInstructions: REJECTED };

    case `${CREATE_NEW_ORDER}_PENDING`: return { ...state, createNewOrder: PENDING };
    case `${CREATE_NEW_ORDER}_FULFILLED`: return { ...state, createNewOrder: FULFILLED };
    case `${CREATE_NEW_ORDER}_REJECTED`: return { ...state, createNewOrder: REJECTED };

    case `${SET_ORDER_LOCATION_ID}_PENDING`: return { ...state, setOrderLocationId: PENDING };
    case `${SET_ORDER_LOCATION_ID}_FULFILLED`: return { ...state, setOrderLocationId: FULFILLED };
    case `${SET_ORDER_LOCATION_ID}_REJECTED`: return { ...state, setOrderLocationId: REJECTED };

    case `${SET_PROMO_CODE}_PENDING`: return { ...state, setPromoCode: PENDING };
    case `${SET_PROMO_CODE}_FULFILLED`: return { ...state, setPromoCode: FULFILLED };
    case `${SET_PROMO_CODE}_REJECTED`: return { ...state, setPromoCode: REJECTED };

    case `${SUBMIT_ORDER}_PENDING`: return { ...state, submitOrder: PENDING };
    case `${SUBMIT_ORDER}_FULFILLED`: return { ...state, submitOrder: FULFILLED };
    case `${SUBMIT_ORDER}_REJECTED`: return { ...state, submitOrder: REJECTED };

    // Payments
    case `${FETCH_PAYMENTS}_PENDING`: return { ...state, fetchPayments: PENDING };
    case `${FETCH_PAYMENTS}_FULFILLED`: return { ...state, fetchPayments: FULFILLED };
    case `${FETCH_PAYMENTS}_REJECTED`: return { ...state, fetchPayments: REJECTED };

    case `${CREATE_PAYMENT}_PENDING`: return { ...state, createPayment: PENDING };
    case `${CREATE_PAYMENT}_FULFILLED`: return { ...state, createPayment: FULFILLED };
    case `${CREATE_PAYMENT}_REJECTED`: return { ...state, createPayment: REJECTED };

    case `${DELETE_PAYMENT}_PENDING`: return { ...state, deletePayment: PENDING };
    case `${DELETE_PAYMENT}_FULFILLED`: return { ...state, deletePayment: FULFILLED };
    case `${DELETE_PAYMENT}_REJECTED`: return { ...state, deletePayment: REJECTED };

    case `${SET_DEFAULT_PAYMENT}_PENDING`: return { ...state, setDefaultPayment: PENDING };
    case `${SET_DEFAULT_PAYMENT}_FULFILLED`: return { ...state, setDefaultPayment: FULFILLED };
    case `${SET_DEFAULT_PAYMENT}_REJECTED`: return { ...state, setDefaultPayment: REJECTED };

    // Favorites
    case `${FETCH_FAVORITES}_PENDING`: return { ...state, fetchFavorites: PENDING };
    case `${FETCH_FAVORITES}_FULFILLED`: return { ...state, fetchFavorites: FULFILLED };
    case `${FETCH_FAVORITES}_REJECTED`: return { ...state, fetchFavorites: REJECTED };

    case `${CREATE_FAVORITE}_PENDING`: return { ...state, createFavorite: PENDING };
    case `${CREATE_FAVORITE}_FULFILLED`: return { ...state, createFavorite: FULFILLED };
    case `${CREATE_FAVORITE}_REJECTED`: return { ...state, createFavorite: REJECTED };

    case `${UPDATE_FAVORITE}_PENDING`: return { ...state, updateFavorite: PENDING };
    case `${UPDATE_FAVORITE}_FULFILLED`: return { ...state, updateFavorite: FULFILLED };
    case `${UPDATE_FAVORITE}_REJECTED`: return { ...state, updateFavorite: REJECTED };

    case `${DELETE_FAVORITE}_PENDING`: return { ...state, deleteFavorite: PENDING };
    case `${DELETE_FAVORITE}_FULFILLED`: return { ...state, deleteFavorite: FULFILLED };
    case `${DELETE_FAVORITE}_REJECTED`: return { ...state, deleteFavorite: REJECTED };

    case RATINGS_FETCH_START: return { ...state, fetchRating: PENDING };
    case RATINGS_FETCH_SUCCESS: return { ...state, fetchRating: FULFILLED };
    case RATINGS_FETCH_ERROR: return { ...state, fetchRating: REJECTED };

    case RATINGS_CREATE_START: return { ...state, createRating: PENDING };
    case RATINGS_CREATE_SUCCESS: return { ...state, createRating: FULFILLED };
    case RATINGS_CREATE_ERROR: return { ...state, createRating: REJECTED };

    case RATINGS_UPDATE_START: return { ...state, updateRating: PENDING };
    case RATINGS_UPDATE_SUCCESS: return { ...state, updateRating: FULFILLED };
    case RATINGS_UPDATE_ERROR: return { ...state, updateRating: REJECTED };

    case RATINGS_DELETE_START: return { ...state, deleteRating: PENDING };
    case RATINGS_DELETE_SUCCESS: return { ...state, deleteRating: FULFILLED };
    case RATINGS_DELETE_ERROR: return { ...state, deleteRating: REJECTED };

    case `${VALIDATE_USER}_PENDING`: return { ...state, validateUser: PENDING };
    case `${VALIDATE_USER}_FULFILLED`: return { ...state, validateUser: FULFILLED };
    case `${VALIDATE_USER}_REJECTED`: return { ...state, validateUser: REJECTED };

    case `${ADD_ALLERGENS}_PENDING`: return { ...state, addAllergens: PENDING };
    case `${ADD_ALLERGENS}_FULFILLED`: return { ...state, addAllergens: FULFILLED };
    case `${ADD_ALLERGENS}_REJECTED`: return { ...state, addAllergens: REJECTED };

    case `${REMOVE_ALLERGENS}_PENDING`: return { ...state, removeAllergens: PENDING };
    case `${REMOVE_ALLERGENS}_FULFILLED`: return { ...state, removeAllergens: FULFILLED };
    case `${REMOVE_ALLERGENS}_REJECTED`: return { ...state, removeAllergens: REJECTED };

    case `${AUTHENTICATE_USER}_PENDING`: return { ...state, authenticateUser: PENDING };
    case `${AUTHENTICATE_USER}_FULFILLED`: return { ...state, authenticateUser: FULFILLED };
    case `${AUTHENTICATE_USER}_REJECTED`: return { ...state, authenticateUser: REJECTED };

    case `${RESOLVE_USER}_PENDING`: return { ...state, resolveUser: PENDING };
    case `${RESOLVE_USER}_FULFILLED`: return { ...state, resolveUser: FULFILLED };
    case `${RESOLVE_USER}_REJECTED`: return { ...state, resolveUser: REJECTED };

    case `${FETCH_LEVELUP_LOYALTY}_PENDING`: return { ...state, fetchLevelUpLoyalty: PENDING };
    case `${FETCH_LEVELUP_LOYALTY}_FULFILLED`: return { ...state, fetchLevelUpLoyalty: FULFILLED };
    case `${FETCH_LEVELUP_LOYALTY}_REJECTED`: return { ...state, fetchLevelUpLoyalty: REJECTED };

    case `${FETCH_LEVELUP_CAMPAIGN}_PENDING`: return { ...state, fetchLevelUpCampaign: PENDING };
    case `${FETCH_LEVELUP_CAMPAIGN}_FULFILLED`: return { ...state, fetchLevelUpCampaign: FULFILLED };
    case `${FETCH_LEVELUP_CAMPAIGN}_REJECTED`: return { ...state, fetchLevelUpCampaign: REJECTED };

    case `${FETCH_LEVELUP_QR_CODE}_PENDING`: return { ...state, fetchLevelUpQRCode: PENDING };
    case `${FETCH_LEVELUP_QR_CODE}_FULFILLED`: return { ...state, fetchLevelUpQRCode: FULFILLED };
    case `${FETCH_LEVELUP_QR_CODE}_REJECTED`: return { ...state, fetchLevelUpQRCode: REJECTED };

    case `${UPDATE_LEVELUP_CONNECTION}_PENDING`: return { ...state, updateLevelUpConnection: PENDING };
    case `${UPDATE_LEVELUP_CONNECTION}_FULFILLED`: return { ...state, updateLevelUpConnection: FULFILLED };
    case `${UPDATE_LEVELUP_CONNECTION}_REJECTED`: return { ...state, updateLevelUpConnection: REJECTED };

    case `${CONNECT_LEVELUP}_PENDING`: return { ...state, connectLevelUp: PENDING };
    case `${CONNECT_LEVELUP}_FULFILLED`: return { ...state, connectLevelUp: FULFILLED };
    case `${CONNECT_LEVELUP}_REJECTED`: return { ...state, connectLevelUp: REJECTED };

    case `${DISCONNECT_LEVELUP}_PENDING`: return { ...state, disconnectLevelUp: PENDING };
    case `${DISCONNECT_LEVELUP}_FULFILLED`: return { ...state, disconnectLevelUp: FULFILLED };
    case `${DISCONNECT_LEVELUP}_REJECTED`: return { ...state, disconnectLevelUp: REJECTED };

    case `${FETCH_LEVELUP_PAYMENT_METHOD}_PENDING`: return { ...state, fetchLevelUpPaymentMethod: PENDING };
    case `${FETCH_LEVELUP_PAYMENT_METHOD}_FULFILLED`: return { ...state, fetchLevelUpPaymentMethod: FULFILLED };
    case `${FETCH_LEVELUP_PAYMENT_METHOD}_REJECTED`: return { ...state, fetchLevelUpPaymentMethod: REJECTED };

    case `${VALIDATE_CURRENT_CART}_PENDING`: return { ...state, validateCurrentCart: PENDING };
    case `${VALIDATE_CURRENT_CART}_FULFILLED`: return { ...state, validateCurrentCart: FULFILLED };
    case `${VALIDATE_CURRENT_CART}_REJECTED`: return { ...state, validateCurrentCart: REJECTED };

    case `${VALIDATE_CURRENT_ORDER}_PENDING`: return { ...state, validateCurrentOrder: PENDING };
    case `${VALIDATE_CURRENT_ORDER}_FULFILLED`: return { ...state, validateCurrentOrder: FULFILLED };
    case `${VALIDATE_CURRENT_ORDER}_REJECTED`: return { ...state, validateCurrentOrder: REJECTED };

    case `${UNAUTHENTICATE_USER}_PENDING`: return { ...state, unauthenticateUser: PENDING };
    case `${UNAUTHENTICATE_USER}_FULFILLED`: return { ...state, unauthenticateUser: FULFILLED };
    case `${UNAUTHENTICATE_USER}_REJECTED`: return { ...state, unauthenticateUser: REJECTED };

    case `${RESET_USER_PASSWORD}_PENDING`: return { ...state, resetUserPassword: PENDING };
    case `${RESET_USER_PASSWORD}_FULFILLED`: return { ...state, resetUserPassword: FULFILLED };
    case `${RESET_USER_PASSWORD}_REJECTED`: return { ...state, resetUserPassword: REJECTED };

    case `${RESET_LEVELUP_PASSWORD}_PENDING`: return { ...state, resetLevelUpPassword: PENDING };
    case `${RESET_LEVELUP_PASSWORD}_FULFILLED`: return { ...state, resetLevelUpPassword: FULFILLED };
    case `${RESET_LEVELUP_PASSWORD}_REJECTED`: return { ...state, resetLevelUpPassword: REJECTED };

    case `${FETCH_USER}_PENDING`: return { ...state, fetchUser: PENDING };
    case `${FETCH_USER}_FULFILLED`: return { ...state, fetchUser: FULFILLED };
    case `${FETCH_USER}_REJECTED`: return { ...state, fetchUser: REJECTED };

    case USER_UPDATE_START: return { ...state, updateUser: PENDING };
    case USER_UPDATE_SUCCESS: return { ...state, updateUser: FULFILLED };
    case USER_UPDATE_ERROR: return { ...state, updateUser: REJECTED };

    case USER_CREATE_START: return { ...state, createUser: PENDING };
    case USER_CREATE_SUCCESS: return { ...state, createUser: FULFILLED };
    case USER_CREATE_ERROR: return { ...state, createUser: REJECTED };

    default: return state;
  }
}
