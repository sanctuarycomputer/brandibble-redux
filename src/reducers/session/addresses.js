import reduxCrud from 'redux-crud';

const baseReducers = reduxCrud.Map.reducersFor('addresses', { key: 'customer_address_id' });
const initialState = {};

export default function addresses(state = initialState, action) {
  switch (action.type) {
    default:
      return baseReducers(state, action);
  }
}
