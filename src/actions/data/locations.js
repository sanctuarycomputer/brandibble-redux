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
