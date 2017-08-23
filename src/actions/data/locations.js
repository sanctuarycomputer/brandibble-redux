import filter from 'lodash.filter';
import fireAction from 'utils/fireAction';
import handleErrors from 'utils/handleErrors';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_LOCATION = 'FETCH_LOCATION';
export const PUSH_GEOLOCATION = 'PUSH_GEOLOCATION';

export const pushGeolocation = location => dispatch => {
  return dispatch(fireAction(PUSH_GEOLOCATION, location));
};

export const fetchLocation = (brandibble, locationId, lat, lng) => {
  return (dispatch) => {
    const payload = brandibble.locations.show(locationId, lat, lng)
      .then(({ data }) => data).catch(handleErrors);
    return dispatch(fireAction(FETCH_LOCATION, payload));
  };
};

/* DEPRECATED
 * This method is no longer supported. A regular Brandibble
 * app doesn't require listing every location in the restaurant
 * group. Instead, use the geolocation reducer to query locations
 * based on User input, then after a selection, use pushGeolocation
 * to add that geolocation object to the locations reducer.  This should
 * make your app very happy and save a big non-discrete request as the
 * restaurant business grows in location data
 */
export const fetchLocations = (brandibble, query = {}) => (dispatch) => {
  const payload = brandibble.locations.index(query).then(({ data }) => {
    // TODO: This is a temporary fix that should be taken out
    // when JC properly implements the orderable flag.
    // Pls Note: is_closed does not correspond to opening hours,
    // it's related to temporary & permanently closed locations.
    const orderableLocations = filter(data, (location) => {
      return (!location.is_closed && !location.is_coming_soon);
    });
    return orderableLocations;
  }).catch(handleErrors);

  return dispatch(fireAction(FETCH_LOCATIONS, payload));
};
