import fireAction from 'utils/fireAction';
import handleErrors from 'utils/handleErrors';

export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';
export const CREATE_ADDRESS = 'CREATE_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';

export const fetchAddresses = brandibble => (dispatch) => {
  const payload = brandibble.addresses.all().then(({ data }) => data).catch(handleErrors);
  return dispatch(fireAction(FETCH_ADDRESSES, payload));
};

export const createAddress = (brandibble, address = {}) => (dispatch) => {
  const payload = brandibble.addresses.create(address).then(({ data }) => ({ ...data[0] })).catch(handleErrors);
  return dispatch(fireAction(CREATE_ADDRESS, payload));
};

export const deleteAddress = (brandibble, id) => (dispatch) => {
  const payload = brandibble.addresses.delete(id).then(() => id).catch(handleErrors);
  return dispatch(fireAction(DELETE_ADDRESS, payload));
};
