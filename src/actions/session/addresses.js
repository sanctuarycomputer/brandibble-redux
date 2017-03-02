/* eslint no-shadow:1 */
import reduxCrud from 'redux-crud';
import generateUUID from 'utils/generateUUID';

const {
  createStart,
  createSuccess,
  createError,
  deleteStart,
  deleteSuccess,
  deleteError,
  fetchStart,
  fetchSuccess,
  fetchError,
} = reduxCrud.actionCreatorsFor('addresses', { key: 'customer_address_id' });

export function fetchAddresses(brandibble) {
  return (dispatch) => {
    dispatch(fetchStart());
    return brandibble.addresses.all()
      .then(({ data }) => dispatch(fetchSuccess(data)))
      .catch(({ errors }) => dispatch(fetchError(errors)));
  };
}

export function createAddress(brandibble, data = {}) {
  return (dispatch) => {
    const id = generateUUID();
    dispatch(createStart({ record: data, customer_address_id: id }));
    return brandibble.addresses.create(data)
      .then(({ data }) => dispatch(createSuccess({ customer_address_id: id, ...data[0] })))
      .catch(({ errors }) => dispatch(createError(errors, { customer_address_id: id, data })));
  };
}

export function deleteAddress(brandibble, id) {
  return (dispatch) => {
    dispatch(deleteStart({ customer_address_id: id }));
    return brandibble.addresses.delete(id)
      .then(() => dispatch(deleteSuccess({ customer_address_id: id })))
      .catch(({ errors }) => dispatch(deleteError(errors, { customer_address_id: id })));
  };
}
