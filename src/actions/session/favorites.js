import fireAction from '../../utils/fireAction';
import handleErrors from '../../utils/handleErrors';
import { getStateWithNamespace } from '../../utils/getStateWithNamespace';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const CREATE_FAVORITE = 'CREATE_FAVORITE';
export const UPDATE_FAVORITE = 'UPDATE_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';

export const fetchFavorites = brandibble => (dispatch) => {
  const payload = brandibble.favorites.all().then(({ data }) => data).catch(handleErrors);
  return dispatch(fireAction(FETCH_FAVORITES, payload));
};

export const createFavorite = (brandibble, favorite = {}) => (dispatch, getState) => {
  const state = getStateWithNamespace(getState);
  const name = favorite.name;
  let lineItem;
  if (favorite.product) {
    lineItem = new state.ref.LineItem(favorite.product, 1);
  } else {
    lineItem = favorite.lineItem;
  }
  const payload = brandibble.favorites.create(name, lineItem).then(({ data }) => data).catch(handleErrors);
  return dispatch(fireAction(CREATE_FAVORITE, payload));
};

export const updateFavorite = (brandibble, favorite = {}) => (dispatch) => {
  const { id, name, lineItem } = favorite;
  const payload = brandibble.favorites.update(id, name, lineItem)
    .then(({ data }) => data)
    .catch(handleErrors);
  return dispatch(fireAction(UPDATE_FAVORITE, payload));
};

export const deleteFavorite = (brandibble, id) => (dispatch) => {
  const payload = brandibble.favorites.delete(id).then(() => id).catch(handleErrors);
  return dispatch(fireAction(DELETE_FAVORITE, payload));
};
