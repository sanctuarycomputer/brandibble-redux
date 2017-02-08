// TODO: this reducer is untested
import { VALIDATE_USER } from 'actions/session/user';
import { Status } from 'utils/constants';
import reduxCrud from 'redux-crud';

const {
  FULFILLED,
  IDLE,
  PENDING,
  REJECTED,
} = Status;

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
  MENUS_FETCH_START,
  MENUS_FETCH_SUCCESS,
  MENUS_FETCH_ERROR,
} = reduxCrud.actionTypesFor('menus');

const initialState = {
  fetchAllergens: IDLE,
  fetchLocations: IDLE,
  fetchMenu: IDLE,
  validateUser: IDLE,
};

export default function status(state=initialState, action) {
  switch (action.type) {
    case ALLERGENS_FETCH_START: return { ...state, fetchAllergens: PENDING }
    case ALLERGENS_FETCH_SUCCESS: return { ...state, fetchAllergens: FULFILLED }
    case ALLERGENS_FETCH_ERROR: return { ...state, fetchAllergens: REJECTED }

    case LOCATIONS_FETCH_START: return { ...state,   fetchLocations: PENDING }
    case LOCATIONS_FETCH_SUCCESS: return { ...state, fetchLocations: FULFILLED }
    case LOCATIONS_FETCH_ERROR: return { ...state,  fetchLocations: REJECTED }

    case MENUS_FETCH_START: return { ...state,   fetchMenu: PENDING }
    case MENUS_FETCH_SUCCESS: return { ...state, fetchMenu: FULFILLED }
    case MENUS_FETCH_ERROR: return { ...state,  fetchMenu: REJECTED }

    case `${VALIDATE_USER}_PENDING`: return { ...state,   validateUser: PENDING }
    case `${VALIDATE_USER}_FULFILLED`: return { ...state, validateUser: FULFILLED }
    case `${VALIDATE_USER}_REJECTED`: return { ...state,  validateUser: REJECTED }

    default: return state;
  }
}
