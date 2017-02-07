const initialState = {};

export default function validations(state=initialState, action) {
  switch(action.type) {
    case 'VALIDATE_USER_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
