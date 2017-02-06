import find from 'lodash.find';
import reduxCrud from 'redux-crud';
const { fetchStart, fetchSuccess, fetchError } = reduxCrud.actionCreatorsFor('locations');

export function fetchLocations(brandibble, lat=null, lng=null, orderType='olo') {
  return dispatch => {
    dispatch(fetchStart());
    return brandibble.locations.index(lat, lng, orderType)
      .then(({ data }) => dispatch(fetchSuccess(data)))
      .catch(({ errors }) => dispatch(fetchError(errors)));
  };
}

export function findLocationByAddress(brandibbleRef, address) {
  return dispatch => {
    const { latitude, longitude } = address;
    return dispatch(fetchLocations(brandibbleRef, latitude, longitude)).then(({records}) => {
      const deliverableLocation = find(records || [], location => location.in_delivery_zone);
      return deliverableLocation ? deliverableLocation.location_id : null;
    });
  };
}
