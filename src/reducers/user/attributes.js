/* eslint no-plusplus:1 */
import {
  CREATE_USER,
  CREATE_AND_AUTHENTICATE_USER,
  UPDATE_USER,
  AUTHENTICATE_USER,
  FETCH_USER,
  RESOLVE_USER,
  UNAUTHENTICATE_USER,
  ADD_ALLERGENS,
  REMOVE_ALLERGENS,
} from '../../actions/session/user';

const initialState = {};

function removeAllergens(removeArr, currentArr) {
  const newArr = [];
  for (let i = 0; i < currentArr.length; i++) {
    if (!removeArr.includes(currentArr[i])) newArr.push(currentArr[i]);
  }
  return newArr;
}

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case `${RESOLVE_USER}_FULFILLED`:
    case `${AUTHENTICATE_USER}_FULFILLED`:
    case `${FETCH_USER}_FULFILLED`:
      return payload;

    case `${ADD_ALLERGENS}_FULFILLED`:
      return {
        ...state,
        allergens: state.allergens.concat(payload.added),
      };

    case `${REMOVE_ALLERGENS}_FULFILLED`:
      return {
        ...state,
        allergens: removeAllergens(payload.removed, state.allergens),
      };

    case `${CREATE_USER}_FULFILLED`:
    case `${UPDATE_USER}_FULFILLED`:
    case `${CREATE_AND_AUTHENTICATE_USER}_FULFILLED`:
      return payload;
    case `${UNAUTHENTICATE_USER}_FULFILLED`:
      return initialState;
    default:
      return state;
  }
};
