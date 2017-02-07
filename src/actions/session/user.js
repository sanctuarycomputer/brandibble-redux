export const VALIDATE_USER = 'VALIDATE_USER';
const NO_OP = f => f;

function _validateUser(brandibble, email, success, fail) {
  return {
    type: VALIDATE_USER,
    payload: brandibble.customers.validateCustomer({email}).then(({data}) => {
      success(data);
      return data;
    })
    .catch(({errors}) => fail(errors)),
  };
}

export function validateUser(brandibble, email, success=NO_OP, fail=NO_OP) {
  return dispatch => dispatch(_validateUser(brandibble, email, success, fail));
}
