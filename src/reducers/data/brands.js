import { FETCH_BRANDS } from '../../actions/data/brands';

export const initialState = {};

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case `${FETCH_BRANDS}_FULFILLED`:
      return {
        ...state,
        brand: payload,
      };
    default:
      return state;
  }
};
