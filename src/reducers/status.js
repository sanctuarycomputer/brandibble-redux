// TODO: this reducer is untested
import {
  SEND_SUPPORT_TICKET,
  SETUP_BRANDIBBLE,
  SETUP_BRANDIBBLE_REDUX,
} from 'actions/application';
import { FETCH_ALLERGENS } from 'actions/data/allergens';
import { SET_DEFAULT_PAYMENT } from 'actions/session/payments';
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
} from 'actions/session/order';
import {
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
  RESET_LEVELUP_PASSWORD,
  RESOLVE_USER,
  VALIDATE_USER,
  ADD_ALLERGENS,
  REMOVE_ALLERGENS,
} from 'actions/session/user';
import {
  FETCH_ALL_CUSTOMER_ORDERS,
  FETCH_PAST_CUSTOMER_ORDERS,
  FETCH_UPCOMING_CUSTOMER_ORDERS,
} from 'actions/session/customerOrders';
import { Status } from 'utils/constants';
import reduxCrud from 'redux-crud';

const {
  FULFILLED,
  IDLE,
  PENDING,
  REJECTED,
} = Status;

const {
  ADDRESSES_FETCH_START,
  ADDRESSES_FETCH_SUCCESS,
  ADDRESSES_FETCH_ERROR,
  ADDRESSES_CREATE_START,
  ADDRESSES_CREATE_SUCCESS,
  ADDRESSES_CREATE_ERROR,
  ADDRESSES_DELETE_START,
  ADDRESSES_DELETE_SUCCESS,
  ADDRESSES_DELETE_ERROR,
} = reduxCrud.actionTypesFor('addresses');

const {
  LOCATIONS_FETCH_START,
  LOCATIONS_FETCH_SUCCESS,
  LOCATIONS_FETCH_ERROR,
} = reduxCrud.actionTypesFor('locations');

const {
  MENUS_FETCH_START,
  MENUS_FETCH_SUCCESS,
  MENUS_FETCH_ERROR,
} = reduxCrud.actionTypesFor('menus');

const {
  PAYMENTS_FETCH_START,
  PAYMENTS_FETCH_SUCCESS,
  PAYMENTS_FETCH_ERROR,
  PAYMENTS_CREATE_START,
  PAYMENTS_CREATE_SUCCESS,
  PAYMENTS_CREATE_ERROR,
  PAYMENTS_DELETE_START,
  PAYMENTS_DELETE_SUCCESS,
  PAYMENTS_DELETE_ERROR,
} = reduxCrud.actionTypesFor('payments');

const {
  FAVORITES_FETCH_START,
  FAVORITES_FETCH_SUCCESS,
  FAVORITES_FETCH_ERROR,
  FAVORITES_CREATE_START,
  FAVORITES_CREATE_SUCCESS,
  FAVORITES_CREATE_ERROR,
  FAVORITES_UPDATE_START,
  FAVORITES_UPDATE_SUCCESS,
  FAVORITES_UPDATE_ERROR,
  FAVORITES_DELETE_START,
  FAVORITES_DELETE_SUCCESS,
  FAVORITES_DELETE_ERROR,
} = reduxCrud.actionTypesFor('favorites');

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
  disconnectLevelUp: IDLE,
  fetchLevelUpPaymentMethod: IDLE,
  fetchLocations: IDLE,
  fetchAllCustomerOrders: IDLE,
  fetchPastCustomerOrders: IDLE,
  fetchUpcomingCustomerOrders: IDLE,
  fetchMenu: IDLE,
  fetchDisplayMenu: IDLE,
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

    case ADDRESSES_FETCH_START: return { ...state, fetchAddresses: PENDING };
    case ADDRESSES_FETCH_SUCCESS: return { ...state, fetchAddresses: FULFILLED };
    case ADDRESSES_FETCH_ERROR: return { ...state, fetchAddresses: REJECTED };

    case ADDRESSES_CREATE_START: return { ...state, createAddress: PENDING };
    case ADDRESSES_CREATE_SUCCESS: return { ...state, createAddress: FULFILLED };
    case ADDRESSES_CREATE_ERROR: return { ...state, createAddress: REJECTED };

    case ADDRESSES_DELETE_START: return { ...state, deleteAddress: PENDING };
    case ADDRESSES_DELETE_SUCCESS: return { ...state, deleteAddress: FULFILLED };
    case ADDRESSES_DELETE_ERROR: return { ...state, deleteAddress: REJECTED };

    case LOCATIONS_FETCH_START: return { ...state, fetchLocations: PENDING };
    case LOCATIONS_FETCH_SUCCESS: return { ...state, fetchLocations: FULFILLED };
    case LOCATIONS_FETCH_ERROR: return { ...state, fetchLocations: REJECTED };

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

    case MENUS_FETCH_START: return { ...state, fetchMenu: PENDING };
    case MENUS_FETCH_SUCCESS: return { ...state, fetchMenu: FULFILLED };
    case MENUS_FETCH_ERROR: return { ...state, fetchMenu: REJECTED };

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

    case PAYMENTS_FETCH_START: return { ...state, fetchPayments: PENDING };
    case PAYMENTS_FETCH_SUCCESS: return { ...state, fetchPayments: FULFILLED };
    case PAYMENTS_FETCH_ERROR: return { ...state, fetchPayments: REJECTED };

    case PAYMENTS_CREATE_START: return { ...state, createPayment: PENDING };
    case PAYMENTS_CREATE_SUCCESS: return { ...state, createPayment: FULFILLED };
    case PAYMENTS_CREATE_ERROR: return { ...state, createPayment: REJECTED };

    case PAYMENTS_DELETE_START: return { ...state, deletePayment: PENDING };
    case PAYMENTS_DELETE_SUCCESS: return { ...state, deletePayment: FULFILLED };
    case PAYMENTS_DELETE_ERROR: return { ...state, deletePayment: REJECTED };

    case `${SET_DEFAULT_PAYMENT}_PENDING`: return { ...state, setDefaultPayment: PENDING };
    case `${SET_DEFAULT_PAYMENT}_FULFILLED`: return { ...state, setDefaultPayment: FULFILLED };
    case `${SET_DEFAULT_PAYMENT}_REJECTED`: return { ...state, setDefaultPayment: REJECTED };

    case FAVORITES_FETCH_START: return { ...state, fetchFavorites: PENDING };
    case FAVORITES_FETCH_SUCCESS: return { ...state, fetchFavorites: FULFILLED };
    case FAVORITES_FETCH_ERROR: return { ...state, fetchFavorites: REJECTED };

    case FAVORITES_CREATE_START: return { ...state, createFavorite: PENDING };
    case FAVORITES_CREATE_SUCCESS: return { ...state, createFavorite: FULFILLED };
    case FAVORITES_CREATE_ERROR: return { ...state, createFavorite: REJECTED };

    case FAVORITES_UPDATE_START: return { ...state, updateFavorite: PENDING };
    case FAVORITES_UPDATE_SUCCESS: return { ...state, updateFavorite: FULFILLED };
    case FAVORITES_UPDATE_ERROR: return { ...state, updateFavorite: REJECTED };

    case FAVORITES_DELETE_START: return { ...state, deleteFavorite: PENDING };
    case FAVORITES_DELETE_SUCCESS: return { ...state, deleteFavorite: FULFILLED };
    case FAVORITES_DELETE_ERROR: return { ...state, deleteFavorite: REJECTED };

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
