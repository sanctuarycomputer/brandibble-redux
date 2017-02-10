export const VALIDATE_USER = 'VALIDATE_USER';
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const UNAUTHENTICATE_USER = 'UNAUTHENTICATE_USER';
export const RESOLVE_USER = 'RESOLVE_USER';

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

function _authenticateUser(brandibble, loginData, success, fail) {
  return {
    type: AUTHENTICATE_USER,
    payload: brandibble.customers.authenticate(loginData).then(({data}) => {
      success(data);
      return data;
    })
    .catch(({errors}) => fail(errors)),
  }
}

function _unauthenticateUser(brandibble, success, fail) {
  return {
    type: UNAUTHENTICATE_USER,
    payload: brandibble.customers.invalidate().then(success).catch(({errors}) => fail(errors)),
  }
}

function _resolveUser(payload) {
  return { type: RESOLVE_USER, payload: payload }
}

export function validateUser(brandibble, email, success=NO_OP, fail=NO_OP) {
  return dispatch => dispatch(_validateUser(brandibble, email, success, fail));
}

export function authenticateUser(brandibble, loginData, success=NO_OP, fail=NO_OP) {
  return dispatch => dispatch(_authenticateUser(brandibble, loginData, success, fail));
}

export function unauthenticateUser(brandibble, success=NO_OP, fail=NO_OP) {
  return dispatch => dispatch(_unauthenticateUser(brandibble, success, fail));
}

export function resolveUser(brandibble) {
  const { adapter, customers } = brandibble;
  const payload = adapter.customerToken ? customers.current() : Promise.resolve({});

  return dispatch => dispatch(_resolveUser(payload));
}
