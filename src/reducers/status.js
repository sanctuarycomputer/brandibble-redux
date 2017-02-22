// TODO: this reducer is untested
import { SETUP_BRANDIBBLE, SETUP_BRANDIBBLE_REDUX } from 'actions/setup';
import { RESOLVE_ORDER } from 'actions/session/order';
import {
  AUTHENTICATE_USER,
  FETCH_USER,
  UNAUTHENTICATE_USER,
  RESET_USER_PASSWORD,
  RESOLVE_USER,
  VALIDATE_USER,
  ADD_ALLERGENS,
  REMOVE_ALLERGENS,
} from 'actions/session/user';
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
  ALLERGENS_FETCH_START,
  ALLERGENS_FETCH_SUCCESS,
  ALLERGENS_FETCH_ERROR,
} = reduxCrud.actionTypesFor('allergens');

const {
  LOCATIONS_FETCH_START,
  LOCATIONS_FETCH_SUCCESS,
  LOCATIONS_FETCH_ERROR,
} = reduxCrud.actionTypesFor('locations');

const {
  CUSTOMER_ORDERS_FETCH_START,
  CUSTOMER_ORDERS_FETCH_SUCCESS,
  CUSTOMER_ORDERS_FETCH_ERROR,
} = reduxCrud.actionTypesFor('customerOrders');

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
  fetchAddresses: IDLE,
  createAddress: IDLE,
  deleteAddress: IDLE,
  fetchAllergens: IDLE,
  addAllergens: IDLE,
  removeAllergens: IDLE,
  fetchLocations: IDLE,
  fetchCustomerOrders: IDLE,
  fetchMenu: IDLE,
  resolveOrder: IDLE,
  fetchPayments: IDLE,
  createPayment: IDLE,
  deletePayment: IDLE,
  authenticateUser: IDLE,
  createUser: IDLE,
  fetchUser: IDLE,
  resetUserPassword: IDLE,
  resolveUser: IDLE,
  unauthenticateUser: IDLE,
  updateUser: IDLE,
  validateUser: IDLE,
};

export default function status(state=initialState, action) {
  switch (action.type) {
    case `${SETUP_BRANDIBBLE}_PENDING`: return { ...state,   setupBrandibble: PENDING }
    case `${SETUP_BRANDIBBLE}_FULFILLED`: return { ...state, setupBrandibble: FULFILLED }
    case `${SETUP_BRANDIBBLE}_REJECTED`: return { ...state,  setupBrandibble: REJECTED }

    case `${SETUP_BRANDIBBLE_REDUX}_PENDING`: return { ...state,   setupBrandibbleRedux: PENDING }
    case `${SETUP_BRANDIBBLE_REDUX}_FULFILLED`: return { ...state, setupBrandibbleRedux: FULFILLED }
    case `${SETUP_BRANDIBBLE_REDUX}_REJECTED`: return { ...state,  setupBrandibbleRedux: REJECTED }

    case ALLERGENS_FETCH_START: return { ...state, fetchAllergens: PENDING }
    case ALLERGENS_FETCH_SUCCESS: return { ...state, fetchAllergens: FULFILLED }
    case ALLERGENS_FETCH_ERROR: return { ...state, fetchAllergens: REJECTED }

    case ADDRESSES_FETCH_START: return { ...state, fetchAddresses: PENDING }
    case ADDRESSES_FETCH_SUCCESS: return { ...state, fetchAddresses: FULFILLED }
    case ADDRESSES_FETCH_ERROR: return { ...state, fetchAddresses: REJECTED }

    case ADDRESSES_CREATE_START: return { ...state, createAddress: PENDING }
    case ADDRESSES_CREATE_SUCCESS: return { ...state, createAddress: FULFILLED }
    case ADDRESSES_CREATE_ERROR: return { ...state, createAddress: REJECTED }

    case ADDRESSES_DELETE_START: return { ...state, deleteAddress: PENDING }
    case ADDRESSES_DELETE_SUCCESS: return { ...state, deleteAddress: FULFILLED }
    case ADDRESSES_DELETE_ERROR: return { ...state, deleteAddress: REJECTED }

    case LOCATIONS_FETCH_START: return { ...state,   fetchLocations: PENDING }
    case LOCATIONS_FETCH_SUCCESS: return { ...state, fetchLocations: FULFILLED }
    case LOCATIONS_FETCH_ERROR: return { ...state,  fetchLocations: REJECTED }

    case CUSTOMER_ORDERS_FETCH_START: return { ...state,   fetchCustomerOrders: PENDING }
    case CUSTOMER_ORDERS_FETCH_SUCCESS: return { ...state, fetchCustomerOrders: FULFILLED }
    case CUSTOMER_ORDERS_FETCH_ERROR: return { ...state,  fetchCustomerOrders: REJECTED }

    case MENUS_FETCH_START: return { ...state,   fetchMenu: PENDING }
    case MENUS_FETCH_SUCCESS: return { ...state, fetchMenu: FULFILLED }
    case MENUS_FETCH_ERROR: return { ...state,  fetchMenu: REJECTED }

    case `${RESOLVE_ORDER}_PENDING`: return { ...state,   resolveOrder: PENDING }
    case `${RESOLVE_ORDER}_FULFILLED`: return { ...state, resolveOrder: FULFILLED }
    case `${RESOLVE_ORDER}_REJECTED`: return { ...state,  resolveOrder: REJECTED }

    case PAYMENTS_FETCH_START: return { ...state, fetchPayments: PENDING }
    case PAYMENTS_FETCH_SUCCESS: return { ...state, fetchPayments: FULFILLED }
    case PAYMENTS_FETCH_ERROR: return { ...state, fetchPayments: REJECTED }

    case PAYMENTS_CREATE_START: return { ...state, createPayment: PENDING }
    case PAYMENTS_CREATE_SUCCESS: return { ...state, createPayment: FULFILLED }
    case PAYMENTS_CREATE_ERROR: return { ...state, createPayment: REJECTED }

    case PAYMENTS_DELETE_START: return { ...state, deletePayment: PENDING }
    case PAYMENTS_DELETE_SUCCESS: return { ...state, deletePayment: FULFILLED }
    case PAYMENTS_DELETE_ERROR: return { ...state, deletePayment: REJECTED }

    case `${VALIDATE_USER}_PENDING`: return { ...state,   validateUser: PENDING }
    case `${VALIDATE_USER}_FULFILLED`: return { ...state, validateUser: FULFILLED }
    case `${VALIDATE_USER}_REJECTED`: return { ...state,  validateUser: REJECTED }

    case `${ADD_ALLERGENS}_PENDING`: return { ...state,   addAllergens: PENDING }
    case `${ADD_ALLERGENS}_FULFILLED`: return { ...state, addAllergens: FULFILLED }
    case `${ADD_ALLERGENS}_REJECTED`: return { ...state,  addAllergens: REJECTED }

    case `${REMOVE_ALLERGENS}_PENDING`: return { ...state,   removeAllergens: PENDING }
    case `${REMOVE_ALLERGENS}_FULFILLED`: return { ...state, removeAllergens: FULFILLED }
    case `${REMOVE_ALLERGENS}_REJECTED`: return { ...state,  removeAllergens: REJECTED }

    case `${AUTHENTICATE_USER}_PENDING`: return { ...state,   authenticateUser: PENDING }
    case `${AUTHENTICATE_USER}_FULFILLED`: return { ...state, authenticateUser: FULFILLED }
    case `${AUTHENTICATE_USER}_REJECTED`: return { ...state,  authenticateUser: REJECTED }

    case `${RESOLVE_USER}_PENDING`: return { ...state,   resolveUser: PENDING }
    case `${RESOLVE_USER}_FULFILLED`: return { ...state, resolveUser: FULFILLED }
    case `${RESOLVE_USER}_REJECTED`: return { ...state,  resolveUser: REJECTED }

    case `${UNAUTHENTICATE_USER}_PENDING`: return { ...state,   unauthenticateUser: PENDING }
    case `${UNAUTHENTICATE_USER}_FULFILLED`: return { ...state, unauthenticateUser: FULFILLED }
    case `${UNAUTHENTICATE_USER}_REJECTED`: return { ...state,  unauthenticateUser: REJECTED }

    case `${RESET_USER_PASSWORD}_PENDING`: return { ...state,   resetUserPassword: PENDING }
    case `${RESET_USER_PASSWORD}_FULFILLED`: return { ...state, resetUserPassword: FULFILLED }
    case `${RESET_USER_PASSWORD}_REJECTED`: return { ...state,  resetUserPassword: REJECTED }

    case `${FETCH_USER}_PENDING`: return { ...state,   fetchUser: PENDING }
    case `${FETCH_USER}_FULFILLED`: return { ...state, fetchUser: FULFILLED }
    case `${FETCH_USER}_REJECTED`: return { ...state,  fetchUser: REJECTED }

    case USER_UPDATE_START: return { ...state,   updateUser: PENDING }
    case USER_UPDATE_SUCCESS: return { ...state, updateUser: FULFILLED }
    case USER_UPDATE_ERROR: return { ...state,  updateUser: REJECTED }

    case USER_CREATE_START: return { ...state,   createUser: PENDING }
    case USER_CREATE_SUCCESS: return { ...state, createUser: FULFILLED }
    case USER_CREATE_ERROR: return { ...state,  createUser: REJECTED }

    default: return state;
  }
}
