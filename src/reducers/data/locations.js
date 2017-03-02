import reduxCrud from 'redux-crud';

const baseReducers = reduxCrud.List.reducersFor('locations', { key: 'location_id' });
const initialState = [];

export default function locations(state = initialState, action) {
  switch (action.type) {
    default:
      return baseReducers(state, action);
  }
}
