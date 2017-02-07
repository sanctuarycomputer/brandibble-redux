import reduxCrud from 'redux-crud';
const { fetchStart, fetchSuccess, fetchError } = reduxCrud.actionCreatorsFor('locations');

export function fetchLocations(brandibble, lat=null, lng=null, limit=50, orderType='olo') {
  return dispatch => {
    dispatch(fetchStart());
    return brandibble.locations.index(lat, lng, limit, orderType)
      .then(({ data }) => dispatch(fetchSuccess(data)))
      .catch(({ errors }) => dispatch(fetchError(errors)));
  };
}
