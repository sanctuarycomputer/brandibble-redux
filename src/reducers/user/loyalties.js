import { FETCH_CUSTOMER_LOYALTIES } from '../../actions/user/loyalties';

export const initialState = {
  loyalties: [],
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case `${FETCH_CUSTOMER_LOYALTIES}_FULFILLED`:
      return {
        ...state,
        loyalties: payload
      };
    default:
      return state;
  }
};
