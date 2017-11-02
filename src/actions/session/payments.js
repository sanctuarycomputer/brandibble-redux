import fireAction from 'utils/fireAction';
import handleErrors from 'utils/handleErrors';

export const FETCH_PAYMENTS      = 'FETCH_PAYMENTS';
export const CREATE_PAYMENT      = 'CREATE_PAYMENT';
export const SET_DEFAULT_PAYMENT = 'SET_DEFAULT_PAYMENT';
export const DELETE_PAYMENT      = 'DELETE_PAYMENT';

export const fetchPayments = brandibble => (dispatch) => {
  const payload = brandibble.payments.all().then(({ data }) => data).catch(handleErrors);
  return dispatch(fireAction(FETCH_PAYMENTS, payload));
};

export const createPayment = (brandibble, payment = {}) => (dispatch) => {
  const payload = brandibble.payments.create(payment).then(({ data }) => data).catch(handleErrors);
  return dispatch(fireAction(CREATE_PAYMENT, payload));
};


export const setDefaultPayment = (brandibble, customer_card_id) => (dispatch) => {
  const payload = brandibble.payments.setDefault(customer_card_id).then(() => customer_card_id).catch(handleErrors);
  return dispatch(fireAction(SET_DEFAULT_PAYMENT, payload));
}

export const deletePayment = (brandibble, id) => (dispatch) => {
  const payload = brandibble.payments.delete(id).then(() => id).catch(handleErrors);
  return dispatch(fireAction(DELETE_PAYMENT, payload));
};

