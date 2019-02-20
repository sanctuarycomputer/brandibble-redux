/* eslint no-shadow:1 */
import fireAction from '../../utils/fireAction';
import handleErrors from '../../utils/handleErrors';
import generateUUID from '../../utils/generateUUID';

export const UPDATE_USER = 'UPDATE_USER';
export const CREATE_USER = 'CREATE_USER';
export const CREATE_AND_AUTHENTICATE_USER = 'CREATE_AND_AUTHENTICATE_USER';
export const VALIDATE_USER = 'VALIDATE_USER';
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const UNAUTHENTICATE_USER = 'UNAUTHENTICATE_USER';
export const RESOLVE_USER = 'RESOLVE_USER';
export const FETCH_USER = 'FETCH_USER';
export const RESET_USER_PASSWORD = 'RESET_USER_PASSWORD';
export const FINISH_RESET_USER_PASSWORD = 'FINISH_RESET_USER_PASSWORD';
export const RESET_LEVELUP_PASSWORD = 'RESET_LEVELUP_PASSWORD';
export const ADD_ALLERGENS = 'ADD_ALLERGENS';
export const REMOVE_ALLERGENS = 'REMOVE_ALLERGENS';
export const FETCH_LEVELUP_QR_CODE = 'FETCH_LEVELUP_QR_CODE';
export const FETCH_LEVELUP_LOYALTY = 'FETCH_LEVELUP_LOYALTY';
export const UPDATE_LEVELUP_CONNECTION = 'UPDATE_LEVELUP_CONNECTION';
export const CONNECT_LEVELUP = 'CONNECT_LEVELUP';
export const DISCONNECT_LEVELUP = 'DISCONNECT_LEVELUP';
export const FETCH_LEVELUP_PAYMENT_METHOD = 'FETCH_LEVELUP_PAYMENT_METHOD';
export const FETCH_LEVELUP_CAMPAIGN = 'FETCH_LEVELUP_CAMPAIGN';

export const createAndAuthenticateUser = (brandibble, createData = {}) => (dispatch) => {
  const payload = brandibble.customers.createAndAuthenticate(createData)
    .then(({ data }) => (data))
    .catch(handleErrors);

  return dispatch(fireAction(CREATE_AND_AUTHENTICATE_USER, payload));
};

export const validateUser = (brandibble, email) => (dispatch) => {
  const payload = brandibble.customers.validateCustomer({ email })
    .then(({ data }) => data)
    .catch(handleErrors);

  const meta = { attemptedEmail: email };

  return dispatch(fireAction(VALIDATE_USER, payload, meta));
};

export const authenticateUser = (brandibble, loginData) => (dispatch) => {
  const payload = brandibble.customers.authenticate(loginData)
    .then(({ data }) => data)
    .catch(handleErrors);

  return dispatch(fireAction(AUTHENTICATE_USER, payload));
};

// TODO - untested
export const addAllergens = (brandibble, allergens) => (dispatch) => {
  const payload = brandibble.allergens.create(allergens)
    .then(({ data }) => data)
    .catch(handleErrors);

  return dispatch(fireAction(ADD_ALLERGENS, payload));
};

// TODO - untested
export const removeAllergens = (brandibble, allergens) => (dispatch) => {
  const payload = brandibble.allergens.remove(allergens)
    .then(({ data }) => data)
    .catch(handleErrors);

  return dispatch(fireAction(REMOVE_ALLERGENS, payload));
};

export const unauthenticateUser = brandibble => (dispatch) => {
  const payload = brandibble.customers.invalidate()
    .catch(handleErrors);

  return dispatch(fireAction(UNAUTHENTICATE_USER, payload));
};

export const fetchUser = (brandibble, id) => (dispatch) => {
  const payload = brandibble.customers.show(id)
    .then(({ data }) => data)
    .catch(handleErrors);

  return dispatch(fireAction(FETCH_USER, payload));
};

export const resetUserPassword = (brandibble, body) => (dispatch) => {
  const payload = brandibble.customers.resetPassword(body)
    .catch(handleErrors);

  return dispatch(fireAction(RESET_USER_PASSWORD, payload));
};

export const finishResetUserPassword = (brandibble, token, body) => (dispatch) => {
  const payload = brandibble.customers.finishResetPassword(token, body)
    .catch(handleErrors);

  return dispatch(fireAction(FINISH_RESET_USER_PASSWORD, payload));
};

export const resetLevelUpPassword = (brandibble, email) => (dispatch) => {
  const payload = brandibble.customers.resetLevelUpPassword(email)
    .catch(handleErrors);

  return dispatch(fireAction(RESET_LEVELUP_PASSWORD, payload));
};

export const resolveUser = brandibble => (dispatch) => {
  const { adapter, customers } = brandibble;
  const payload = adapter.customerToken ? customers.current().then(({ data }) => data) : Promise.resolve({});

  return dispatch({ type: RESOLVE_USER, payload });
};

export const createUser = (brandibble, data = {}) => (dispatch) => {
  const id = generateUUID();
  const payload = brandibble.customers.create(data)
    .then(({ data }) => ({ id, ...data }))
    .catch(handleErrors);

  return dispatch(fireAction(CREATE_USER, payload));
};

export const updateUser = (brandibble, id, data = {}) => (dispatch) => {
  const payload = brandibble.customers.updateCurrent(data)
    .then(({ data }) => ({ id, ...data }))
    .catch(handleErrors);

  return dispatch(fireAction(UPDATE_USER, payload));
};

// Level Up Action Creators
export const fetchLevelUpQRCode = (brandibble, data = {}) => (dispatch) => {
  const payload = brandibble.customers.currentLevelUpQRCode(data)
    .then(({ data }) => data.qr_code)
    .catch(handleErrors);

  return dispatch(fireAction(FETCH_LEVELUP_QR_CODE, payload));
};

export const fetchLevelUpCampaign = (brandibble, campaignId, campaignType) => (dispatch) => {
  const payload = brandibble.customers.currentLevelUpCampaign(campaignId, campaignType)
    .then(({ data }) => ({ campaign: data.campaign, meta: { campaignId, campaignType } }))
    .catch(handleErrors);

  return dispatch(fireAction(FETCH_LEVELUP_CAMPAIGN, payload));
};

export const fetchLevelUpLoyalty = brandibble => (dispatch) => {
  const payload = brandibble.customers.currentLevelUpLoyalty()
    .then(({ data }) => data.loyalty)
    .catch(handleErrors);

  return dispatch(fireAction(FETCH_LEVELUP_LOYALTY, payload));
};

export const updateLevelUpConnection = (brandibble, customerId, password) => (dispatch) => {
  const payload = brandibble.customers.levelUpUpdate(customerId, password)
    .catch(handleErrors);

  return dispatch(fireAction(UPDATE_LEVELUP_CONNECTION, payload));
};

export const connectLevelUp = (brandibble, customerId, email, password) => (dispatch) => {
  const payload = brandibble.customers.levelUpConnect(customerId, email, password)
    .catch(handleErrors);

  return dispatch(fireAction(CONNECT_LEVELUP, payload));
};

export const disconnectLevelUp = (brandibble, customerId) => (dispatch) => {
  const payload = brandibble.customers.levelUpDisconnect(customerId)
    .catch(handleErrors);

  return dispatch(fireAction(DISCONNECT_LEVELUP, payload));
};

export const fetchLevelUpPaymentMethod = (brandibble, customerId) => (dispatch) => {
  const payload = brandibble.customers.levelUpPaymentMethod(customerId)
    .then(({ data }) => data.payment_method)
    .catch(handleErrors);

  return dispatch(fireAction(FETCH_LEVELUP_PAYMENT_METHOD, payload));
};
