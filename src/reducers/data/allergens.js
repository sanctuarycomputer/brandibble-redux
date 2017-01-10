import reduxCrud from 'redux-crud';
const baseReducers = reduxCrud.reducersFor('allergens');

const initialState = [];

export default function allergens(state=initialState, action) {
  switch(action.type) {
    default:
      return baseReducers(state, action);
  }
}
