import reduxCrud from 'redux-crud';

const { fetchStart, fetchSuccess, fetchError } = reduxCrud.actionCreatorsFor('locations', { key: 'location_id' });

export function fetchLocations(brandibble, query = {}) {
  return (dispatch) => {
    dispatch(fetchStart());
    return brandibble.locations.index(query)
      .then(({ data }) => dispatch(fetchSuccess(data)))
      .catch(({ errors }) => dispatch(fetchError(errors)));
  };
}
