import fireAction from 'utils/fireAction';
import handleErrors from 'utils/handleErrors';

export const FETCH_ALLERGENS = 'FETCH_ALLERGENS';

export const fetchAllergens = brandibble => (dispatch) => {
  const payload = brandibble.allergens.all().then(({ data }) => data).catch(handleErrors);
  return dispatch(fireAction(FETCH_ALLERGENS, payload));
};
