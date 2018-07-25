/* eslint no-shadow:1 */
import reduxCrud from 'redux-crud';
import generateUUID from '../../utils/generateUUID';

const {
  updateStart,
  updateSuccess,
  updateError,
  createStart,
  createSuccess,
  createError,
} = reduxCrud.actionCreatorsFor('user');

export const VALIDATE_USER = 'VALIDATE_USER';
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const UNAUTHENTICATE_USER = 'UNAUTHENTICATE_USER';
export const RESOLVE_USER = 'RESOLVE_USER';
export const FETCH_USER = 'FETCH_USER';
export const RESET_USER_PASSWORD = 'RESET_USER_PASSWORD';
export const RESET_LEVELUP_PASSWORD = 'RESET_LEVELUP_PASSWORD';
export const ADD_ALLERGENS = 'ADD_ALLERGENS';
export const REMOVE_ALLERGENS = 'REMOVE_ALLERGENS';
export const FETCH_LEVELUP_QR_CODE = 'FETCH_LEVELUP_QR_CODE';
export const FETCH_LEVELUP_LOYALTY = 'FETCH_LEVELUP_LOYALTY';
export const FETCH_LEVELUP_CAMPAIGN = 'FETCH_LEVELUP_CAMPAIGN';
export const UPDATE_LEVELUP_CONNECTION = 'UPDATE_LEVELUP_CONNECTION';
export const CONNECT_LEVELUP = 'CONNECT_LEVELUP';
export const DISCONNECT_LEVELUP = 'DISCONNECT_LEVELUP';
export const FETCH_LEVELUP_PAYMENT_METHOD = 'FETCH_LEVELUP_PAYMENT_METHOD';

const NO_OP = f => f;

function _validateUser(brandibble, email, success, fail) {
  return {
    type: VALIDATE_USER,
    payload: brandibble.customers.validateCustomer({ email }).then(({ data }) => {
      success(data);
      return data;
    })
    .catch((response) => {
      const { errors } = response;
      throw fail(errors || response);
    }),
  };
}

function _authenticateUser(brandibble, loginData, success, fail) {
  return {
    type: AUTHENTICATE_USER,
    payload: brandibble.customers.authenticate(loginData).then(({ data }) => {
      success(data);
      return data;
    })
    .catch((response) => {
      const { errors } = response;
      throw fail(errors || response);
    }),
  };
}

function _addAllergens(brandibble, allergens, success, fail) {
  return {
    type: ADD_ALLERGENS,
    payload: brandibble.allergens.create(allergens).then(({ data }) => {
      success(data);
      return data;
    })
    .catch((response) => {
      const { errors } = response;
      throw fail(errors || response);
    }),
  };
}

function _removeAllergens(brandibble, allergens, success, fail) {
  return {
    type: REMOVE_ALLERGENS,
    payload: brandibble.allergens.remove(allergens).then(({ data }) => {
      success(data);
      return data;
    })
    .catch((response) => {
      const { errors } = response;
      throw fail(errors || response);
    }),
  };
}

function _unauthenticateUser(brandibble, success, fail) {
  return {
    type: UNAUTHENTICATE_USER,
    payload: brandibble.customers.invalidate().then(success).catch((response) => {
      const { errors } = response;
      throw fail(errors || response);
    }),
  };
}

function _resolveUser(payload) {
  return { type: RESOLVE_USER, payload };
}

function _fetchUser(brandibble, id) {
  return {
    type: FETCH_USER,
    payload: brandibble.customers.show(id).then(({ data }) => data).catch((response) => {
      const { errors } = response;
      return errors || response;
    }),
  };
}

function _resetUserPassword(brandibble, email, success, fail) {
  return {
    type: RESET_USER_PASSWORD,
    payload: brandibble.customers.resetPassword(email).then(success).catch((response) => {
      const { errors } = response;
      throw fail(errors || response);
    }),
  };
}

function _resetLevelUpPassword(brandibble, email, success, fail) {
  return {
    type: RESET_LEVELUP_PASSWORD,
    payload: brandibble.customers.resetLevelUpPassword(email).then(success).catch((response) => {
      const { errors } = response;
      throw fail(errors || response);
    }),
  };
}

// Level Up Actions

const _fetchLevelUpQRCode = (brandibble, body, success, fail) => {
  return {
    type: FETCH_LEVELUP_QR_CODE,
    payload: brandibble.customers.currentLevelUpQRCode(body).then(({ data }) => {
      success(data.qr_code);
      return data.qr_code;
    }).catch((response) => {
      const { errors } = response;
      throw fail(errors || response);
    }),
  };
};

const _fetchLevelUpCampaign = (brandibble, campaignId, campaignType, success, fail) => {
  return {
    type: FETCH_LEVELUP_CAMPAIGN,
    payload: brandibble.customers.currentLevelUpCampaign(campaignId, campaignType).then(({ data }) => {
      const responseWithMeta = { campaign: data.campaign, meta: { campaignId, campaignType } }
      success(responseWithMeta);
      return responseWithMeta;
    }).catch((response) => {
      const { errors } = response;
      throw fail(errors || response);
    }),
  };
};

const _fetchLevelUpLoyalty = (brandibble, success, fail) => {
  return {
    type: FETCH_LEVELUP_LOYALTY,
    payload: brandibble.customers.currentLevelUpLoyalty().then(({ data }) => {
      success(data.loyalty);
      return data.loyalty;
    }).catch((response) => {
      const { errors } = response;
      throw fail(errors || response);
    }),
  };
};

const _updateLevelUpConnection = (brandibble, customerId, password) => {
  return {
    type: UPDATE_LEVELUP_CONNECTION,
    payload: brandibble.customers.levelUpUpdate(customerId, password)
  };
};

const _connectLevelUp = (brandibble, customerId, email, password) => {
  return {
    type: CONNECT_LEVELUP,
    payload: brandibble.customers.levelUpConnect(customerId, email, password)
  };
};

const _disconnectLevelUp = (brandibble, customerId) => {
  return {
    type: DISCONNECT_LEVELUP,
    payload: brandibble.customers.levelUpDisconnect(customerId)
    .catch((response) => {
      const { errors } = response;
      throw errors || response;
    }),
  };
};

const _fetchLevelUpPaymentMethod = (brandibble, customerId) => {
  return {
    type: FETCH_LEVELUP_PAYMENT_METHOD,
    payload: brandibble.customers.levelUpPaymentMethod(customerId).then(({ data }) => {
      return data.payment_method;
    })
    .catch((response) => {
      const { errors } = response;
      throw errors || response;
    }),
  };
};

export function validateUser(brandibble, email, success = NO_OP, fail = NO_OP) {
  return dispatch => dispatch(_validateUser(brandibble, email, success, fail));
}

export function authenticateUser(brandibble, loginData, success = NO_OP, fail = NO_OP) {
  return dispatch => dispatch(_authenticateUser(brandibble, loginData, success, fail));
}

// TODO - untested
export function addAllergens(brandibble, allergens, success = NO_OP, fail = NO_OP) {
  return dispatch => dispatch(_addAllergens(brandibble, allergens, success, fail));
}

// TODO - untested
export function removeAllergens(brandibble, allergens, success = NO_OP, fail = NO_OP) {
  return dispatch => dispatch(_removeAllergens(brandibble, allergens, success, fail));
}

export function unauthenticateUser(brandibble, success = NO_OP, fail = NO_OP) {
  return dispatch => dispatch(_unauthenticateUser(brandibble, success, fail));
}

export function fetchUser(brandibble, id) {
  return dispatch => dispatch(_fetchUser(brandibble, id));
}

// TODO - untested
export function resetUserPassword(brandibble, email, success = NO_OP, fail = NO_OP) {
  return dispatch => dispatch(_resetUserPassword(brandibble, email, success, fail));
}

export function resetLevelUpPassword(brandibble, email, success = NO_OP, fail = NO_OP) {
  return dispatch => dispatch(_resetLevelUpPassword(brandibble, email, success, fail));
}

export function resolveUser(brandibble) {
  const { adapter, customers } = brandibble;
  const payload = adapter.customerToken ? customers.current().then(({ data }) => data) : Promise.resolve({});

  return dispatch => dispatch(_resolveUser(payload));
}

export function createUser(brandibble, data = {}) {
  return (dispatch) => {
    const id = generateUUID();
    dispatch(createStart({ record: data, id }));
    return brandibble.customers.create(data)
      .then(({ data }) => dispatch(createSuccess({ id, ...data })))
      .catch((response) => {
        const { errors } = response;
        return dispatch(createError(errors || response, { id, data }));
      });
  };
}

export function updateUser(brandibble, id, data = {}) {
  return (dispatch) => {
    dispatch(updateStart({ record: data, id }));
    return brandibble.customers.updateCurrent(data)
      .then(({ data }) => dispatch(updateSuccess({ id, ...data })))
      .catch((response) => {
        const { errors } = response;
        return dispatch(updateError(errors || response, { id, data }));
      });
  };
}

// Level Up Action Creators
export const fetchLevelUpQRCode = (brandibble, data = {}, success = NO_OP, fail = NO_OP) => {
  return dispatch => dispatch(_fetchLevelUpQRCode(brandibble, data, success, fail));
};

export const fetchLevelUpCampaign = (brandibble, campaignId, campaignType, success = NO_OP, fail = NO_OP) => {
  return dispatch => dispatch(_fetchLevelUpCampaign(brandibble, campaignId, campaignType, success, fail));
};

export const fetchLevelUpLoyalty = (brandibble, success = NO_OP, fail = NO_OP) => {
  return dispatch => dispatch(_fetchLevelUpLoyalty(brandibble, success, fail));
};

export const updateLevelUpConnection = (brandibble, customerId, password) => {
  return dispatch => dispatch(_updateLevelUpConnection(brandibble, customerId, password));
};

export const connectLevelUp = (brandibble, customerId, email, password) => {
  return dispatch => dispatch(_connectLevelUp(brandibble, customerId, email, password));
};

export const disconnectLevelUp = (brandibble, customerId) => {
  return dispatch => dispatch(_disconnectLevelUp(brandibble, customerId));
};

export const fetchLevelUpPaymentMethod = (brandibble, customerId) => {
  return dispatch => dispatch(_fetchLevelUpPaymentMethod(brandibble, customerId));
};
