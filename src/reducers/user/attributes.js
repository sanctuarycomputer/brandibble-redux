import reduxCrud from 'redux-crud';
import {
  AUTHENTICATE_USER,
  FETCH_USER,
  RESOLVE_USER,
  UNAUTHENTICATE_USER,
  ADD_ALLERGENS,
  REMOVE_ALLERGENS,
} from 'actions/session/user';

const {
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
} = reduxCrud.actionTypesFor('user');
const initialState = {};

function removeAllergens(removeArr, currentArr) {
  let newArr = [];
  for (let i = 0; i < currentArr.length; i++) {
    if (removeArr.indexOf(currentArr[i]) < 0) newArr.push(currentArr[i]);
  }
  return newArr;
}

export default function attributes(state=initialState, action) {
  switch(action.type) {
    case `${RESOLVE_USER}_FULFILLED`:
    case `${AUTHENTICATE_USER}_FULFILLED`:
    case `${FETCH_USER}_FULFILLED`:
      return action.payload;

    case `${ADD_ALLERGENS}_FULFILLED`:
      return {
        ...state,
        allergens: state.allergens.concat(action.payload.added),
      }

    case `${REMOVE_ALLERGENS}_FULFILLED`:
      return {
        ...state,
        allergens: removeAllergens(action.payload.removed, state.allergens),
      }

    case USER_CREATE_SUCCESS:
    case USER_UPDATE_SUCCESS:
      return action.record;
    case `${UNAUTHENTICATE_USER}_FULFILLED`:
      return initialState;
    default:
      return state;
  }
}
