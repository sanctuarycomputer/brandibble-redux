import filter from 'lodash.filter';
import fireAction from 'utils/fireAction';
import handleErrors from 'utils/handleErrors';

export const FETCH_GEOLOCATIONS = 'FETCH_GEOLOCATIONS';
export const CLEAR_GEOLOCATIONS = 'CLEAR_GEOLOCATIONS';

export const fetchGeolocations = (brandibble, query = {}) => (dispatch) => {
  const payload = brandibble.locations.index(query)
    .then(({ data }) => {
      // TODO: This is a temporary fix that should be taken out
      // when JC properly implements the orderable flag.
      // Pls Note: is_closed does not correspond to opening hours,
      // it's related to temporary & permanently closed locations.
      return filter(data, location => {
        return (!location.is_closed && !location.is_coming_soon);
      });
    }).catch(handleErrors);

  return dispatch(fireAction(FETCH_GEOLOCATIONS, payload));
}

export const clearGeolocations = () => (dispatch) => {
  return dispatch(fireAction(CLEAR_GEOLOCATIONS, null));
}
