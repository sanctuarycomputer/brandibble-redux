import fireAction from '../../utils/fireAction';
import handleErrors from '../../utils/handleErrors';

export const FETCH_BRANDS = 'FETCH_BRANDS';

export const fetchBrands = brandibble => {
  const payload = brandibble.brands.current()
    .then(({ data }) => data)
    .catch(handleErrors);

  return dispatch(fireAction(FETCH_BRANDS, payload));
};
