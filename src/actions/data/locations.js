import fireAction from 'utils/fireAction';
import handleErrors from 'utils/handleErrors';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_LOCATION = 'FETCH_LOCATION';

export const fetchLocation = (brandibble, locationId, lat, lng) => {
  return (dispatch) => {
    const payload = brandibble.locations.show(locationId, lat, lng)
      .then(({ data }) => data).catch(handleErrors);
    return dispatch(fireAction(FETCH_LOCATION, payload));
  };
};

export const fetchLocations = (brandibble, query = {}) => (dispatch) => {
  const payload = brandibble.locations.index(query).then(({ data }) => {
    // TODO: This is a temporary fix that should be taken out
    // when JC properly implements the orderable flag.
    // Pls Note: is_closed does not correspond to opening hours,
    // it's related to temporary & permanently closed locations.
    const orderableLocations = data.filter((location) => {
      return (!location.is_closed && !location.is_coming_soon);
    });
    return orderableLocations;
  }).catch(handleErrors);

  return dispatch(fireAction(FETCH_LOCATIONS, payload));
};
