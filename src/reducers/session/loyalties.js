import { FETCH_CUSTOMER_LOYALTIES } from '../../actions/session/loyalties';

export const initialState = {
  loyalties: [],
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  let newState;

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
