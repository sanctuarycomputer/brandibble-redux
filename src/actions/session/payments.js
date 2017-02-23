import reduxCrud from 'redux-crud';
import generateUUID from 'utils/generateUUID';
const {
  fetchStart,
  fetchSuccess,
  fetchError,
  createStart,
  createSuccess,
  createError,
  deleteStart,
  deleteSuccess,
  deleteError,
} = reduxCrud.actionCreatorsFor('payments', {key: 'customer_card_id'});

export function fetchPayments(brandibble) {
  return dispatch => {
    dispatch(fetchStart());
    return brandibble.payments.all()
      .then(({data}) => dispatch(fetchSuccess(data)))
      .catch(({errors}) => dispatch(fetchError(errors)));
  };
}

export function createPayment(brandibble, data={}) {
  return dispatch => {
    const id = generateUUID();
    dispatch(createStart({record: data, customer_card_id: id}));
    return brandibble.payments.create(data)
      .then(({data}) => dispatch(createSuccess({ customer_card_id: id, ...data[0] })))
      .catch(({errors}) => dispatch(createError(errors, { customer_card_id: id, data })));
  };
}

export function deletePayment(brandibble, id) {
  return dispatch => {
    dispatch(deleteStart({customer_card_id: id}));
    return brandibble.payments.delete(id)
      .then(() => dispatch(deleteSuccess({ customer_card_id: id })))
      .catch(({errors}) => dispatch(fetchError(errors, { customer_card_id: id })));
  };
}

// TODO - set default payment action
