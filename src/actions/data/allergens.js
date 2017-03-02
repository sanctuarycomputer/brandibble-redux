import reduxCrud from 'redux-crud';

const { fetchStart, fetchSuccess, fetchError } = reduxCrud.actionCreatorsFor('allergens');

export function fetchAllergens(brandibbleRef) {
  return (dispatch) => {
    dispatch(fetchStart());
    return brandibbleRef.allergens.all()
      .then(res => dispatch(fetchSuccess(res.data)))
      .catch(errors => dispatch(fetchError(errors)));
  };
}
