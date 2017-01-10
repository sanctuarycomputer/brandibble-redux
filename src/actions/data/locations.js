import find from 'lodash.find';
import reduxCrud from 'redux-crud';
const { fetchStart, fetchSuccess, fetchError } = reduxCrud.actionCreatorsFor('locations');

export function fetchLocations(brandibbleRef, lat=null, lng=null) {
  return dispatch => {
    dispatch(fetchStart());
    return brandibbleRef.locations.index(lat, lng)
      .then(res => dispatch(fetchSuccess(res)))
      .catch(errors => dispatch(fetchError(errors)));
  };
}

export function findLocationByAddress(brandibbleRef, address) {
  return dispatch => {
    const { latitude, longitude } = address;
    return dispatch(fetchLocations(brandibbleRef, latitude, longitude)).then(res => {
      const locations = res.records;
      const deliverableLocation = find(locations.data || [], location => location.in_delivery_zone);
      return deliverableLocation ? deliverableLocation.location_id : null;
    });
  };
}
