import fireAction from '../../utils/fireAction';
import handleErrors from '../../utils/handleErrors';

export const FETCH_GEOLOCATIONS = 'FETCH_GEOLOCATIONS';
export const CLEAR_GEOLOCATIONS = 'CLEAR_GEOLOCATIONS';

export const fetchGeolocations = (brandibble, query = {}) => (dispatch) => {
  const payload = brandibble.locations.index(query).then(({ data }) => data).catch(handleErrors);
  return dispatch(fireAction(FETCH_GEOLOCATIONS, payload));
}

export const clearGeolocations = () => (dispatch) => {
  return dispatch(fireAction(CLEAR_GEOLOCATIONS, null));
}
