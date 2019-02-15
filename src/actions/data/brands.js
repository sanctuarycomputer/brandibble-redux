import fireAction from '../../utils/fireAction';
import handleErrors from '../../utils/handleErrors';

export const FETCH_BRAND = 'FETCH_BRAND';

export const fetchBrand = brandibble => {
  const payload = brandibble.brands.current()
    .then(({ data }) => data)
    .catch(handleErrors);

  return dispatch(fireAction(FETCH_BRAND, payload));
};
