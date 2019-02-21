import {
  VALIDATE_USER,
  UNAUTHENTICATE_USER,
} from '../../actions/session/user';

const initialState = {
  attempted_email: ''
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case `${VALIDATE_USER}_PENDING`:
      const { attempted_email } = action.meta;

      return {
        ...state,
        attempted_email
      };
    case `${VALIDATE_USER}_FULFILLED`:
      return {
        ...state,
        ...action.payload
      };
    case `${UNAUTHENTICATE_USER}_FULFILLED`:
      return initialState;
    default:
      return state;
  }
};
