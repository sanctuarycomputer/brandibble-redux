import reduxCrud from 'redux-crud';

// setup
import {
  SETUP_BRANDIBBLE,
  SETUP_BRANDIBBLE_REDUX,
} from 'actions/setup';

// orders
import { RESOLVE_ORDER } from 'actions/session/order';

// user
import {
  AUTHENTICATE_USER,
  FETCH_USER,
  RESET_USER_PASSWORD,
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

// allergens
const {
  ALLERGENS_FETCH_START,
  ALLERGENS_FETCH_ERROR,
} = reduxCrud.actionTypesFor('allergens');

// locations
const {
  LOCATIONS_FETCH_START,
  LOCATIONS_FETCH_ERROR,
} = reduxCrud.actionTypesFor('locations');

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

export const initialState = {
  // setup
  setupBrandibble: null,
  setupBrandibbleRedux: null,
  // allergens
  fetchAllergens: null,
  addAllergens: null,
  removeAllergens: null,
  // addresses
  fetchAddresses: null,
  createAddress: null,
  deleteAddress: null,
  // locations
  fetchLocations: null,
  // menu
  fetchMenu: null,
  // orders
  resolveOrder: null,
  // payments
  fetchPayments: null,
  createPayment: null,
  deletePayment: null,
  // user
  authenticateUser: null,
  createUser: null,
  fetchUser: null,
  resetUserPassword: null,
  resolveUser: null,
  unauthenticateUser: null,
  updateUser: null,
  validateUser: null,
};

export default function error(state=initialState, action) {
  switch (action.type) {
    // setup
    case `${SETUP_BRANDIBBLE}_PENDING`: return { ...state, setupBrandibble: null };
    case `${SETUP_BRANDIBBLE}_REJECTED`: return { ...state, setupBrandibble: action.payload}

    case `${SETUP_BRANDIBBLE_REDUX}_PENDING`: return { ...state, setupBrandibbleRedux: null };
    case `${SETUP_BRANDIBBLE_REDUX}_REJECTED`: return { ...state, setupBrandibbleRedux: action.payload}

    // allergens
    case ALLERGENS_FETCH_START: return { ...state, fetchAllergens: null };
    case ALLERGENS_FETCH_ERROR: return { ...state, fetchAllergens: action.error}

    // addresses
    case ADDRESSES_FETCH_START: return { ...state, fetchAddresses: null };
    case ADDRESSES_FETCH_ERROR: return { ...state, fetchAddresses: action.error}

    case ADDRESSES_CREATE_START: return { ...state, createAddress: null };
    case ADDRESSES_CREATE_ERROR: return { ...state, createAddress: action.error}

    case ADDRESSES_DELETE_START: return { ...state, deleteAddress: null };
    case ADDRESSES_DELETE_ERROR: return { ...state, deleteAddress: action.error}

    // locations
    case LOCATIONS_FETCH_START: return { ...state, fetchLocations: null };
    case LOCATIONS_FETCH_ERROR: return { ...state, fetchLocations: action.error}

    // menu
    case MENUS_FETCH_START: return { ...state, fetchMenu: null };
    case MENUS_FETCH_ERROR: return { ...state, fetchMenu: action.error}

    // orders
    case `${RESOLVE_ORDER}_PENDING`: return { ...state, resolveOrder: null };
    case `${RESOLVE_ORDER}_REJECTED`: return { ...state, resolveOrder: action.payload}

    // payments
    case PAYMENTS_FETCH_START: return { ...state, fetchPayments: null };
    case PAYMENTS_FETCH_ERROR: return { ...state, fetchPayments: action.error}

    case PAYMENTS_CREATE_START: return { ...state, createPayment: null };
    case PAYMENTS_CREATE_ERROR: return { ...state, createPayment: action.error}

    case PAYMENTS_DELETE_START: return { ...state, deletePayment: null };
    case PAYMENTS_DELETE_ERROR: return { ...state, deletePayment: action.error}

    // users
    case `${AUTHENTICATE_USER}_PENDING`: return { ...state, authenticateUser: null };
    case `${AUTHENTICATE_USER}_REJECTED`: return { ...state, authenticateUser: action.payload}

    case `${ADD_ALLERGENS}_PENDING`: return { ...state,   addAllergens: null }
    case `${ADD_ALLERGENS}_FULFILLED`: return { ...state, addAllergens: action.payload }
    case `${ADD_ALLERGENS}_REJECTED`: return { ...state,  addAllergens: action.error }

    case `${REMOVE_ALLERGENS}_PENDING`: return { ...state,   removeAllergens: null }
    case `${REMOVE_ALLERGENS}_FULFILLED`: return { ...state, removeAllergens: action.payload }
    case `${REMOVE_ALLERGENS}_REJECTED`: return { ...state,  removeAllergens: action.error }

    case `${RESOLVE_USER}_PENDING`: return { ...state, resolveUser: null };
    case `${RESOLVE_USER}_REJECTED`: return { ...state, resolveUser: action.payload}

    case `${UNAUTHENTICATE_USER}_PENDING`: return { ...state, unauthenticateUser: null };
    case `${UNAUTHENTICATE_USER}_REJECTED`: return { ...state, unauthenticateUser: action.payload}

    case `${VALIDATE_USER}_PENDING`: return { ...state, validateUser: null };
    case `${VALIDATE_USER}_REJECTED`: return { ...state, validateUser: action.payload}

    case `${RESET_USER_PASSWORD}_PENDING`: return { ...state, resetUserPassword: null };
    case `${RESET_USER_PASSWORD}_REJECTED`: return { ...state, resetUserPassword: action.payload}

    case `${FETCH_USER}_PENDING`: return { ...state, fetchUser: null };
    case `${FETCH_USER}_REJECTED`: return { ...state, fetchUser: action.payload}

    case USER_UPDATE_START: return { ...state, updateUser: null };
    case USER_UPDATE_ERROR: return { ...state, updateUser: action.error}

    case USER_CREATE_START: return { ...state, createUser: null };
    case USER_CREATE_ERROR: return { ...state, createUser: action.error}

    default: return state;
  }
}
