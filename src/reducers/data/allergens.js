import Immutable from 'seamless-immutable';
import { FETCH_ALLERGENS } from 'actions/data/allergens';

export const initialState = Immutable({
  allergensById: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_ALLERGENS}_FULFILLED`:
      return state.merge({
        allergensById: Immutable.asObject(action.payload, (allergen) => {
          return [allergen.id, allergen];
        }),
      });
    default:
      return state;
  }
};
