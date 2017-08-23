import Immutable from 'seamless-immutable';
import {
  CREATE_FAVORITE,
  DELETE_FAVORITE,
  FETCH_FAVORITES,
  UPDATE_FAVORITE,
} from 'actions/session/favorites';
import { UNAUTHENTICATE_USER } from 'actions/session/user';

export const initialState = Immutable({
  favoritesById: Immutable({}),
});

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case `${FETCH_FAVORITES}_FULFILLED`:
      return state.merge({
        favoritesById: state.favoritesById.replace(Immutable.asObject(payload, (favorite) => {
          return [favorite.favorite_item_id, favorite];
        })),
      });
    case `${DELETE_FAVORITE}_FULFILLED`:
      return state.merge({
        favoritesById: state.favoritesById.without((v, k) => {
          return k === `${payload}` && v.favorite_item_id === payload;
        }),
      });
    case `${UPDATE_FAVORITE}_FULFILLED`:
    case `${CREATE_FAVORITE}_FULFILLED`:
      return state.setIn(['favoritesById', payload.favorite_item_id], payload);

    case `${UNAUTHENTICATE_USER}_FULFILLED`:
      return initialState;
    default:
      return state;
  }
};
