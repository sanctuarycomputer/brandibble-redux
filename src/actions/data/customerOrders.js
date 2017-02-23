export const FETCH_ALL_CUSTOMER_ORDERS  = 'FETCH_ALL_CUSTOMER_ORDERS';
export const FETCH_PAST_CUSTOMER_ORDERS = 'FETCH_PAST_CUSTOMER_ORDERS';
export const FETCH_UPCOMING_CUSTOMER_ORDERS = 'FETCH_UPCOMING_CUSTOMER_ORDERS';

function _fetchAllCustomerOrders(brandibble, customerId) {
  return {
    type: FETCH_ALL_CUSTOMER_ORDERS,
    payload: brandibble.customers.orders(customerId, {status: 'both'})
  };
}

function _fetchPastCustomerOrders(brandibble, customerId) {
  return {
    type: FETCH_PAST_CUSTOMER_ORDERS,
    payload: brandibble.customers.orders(customerId, {status: 'past'})
  };
}

function _fetchUpcomingCustomerOrders(brandibble, customerId) {
  return {
    type: FETCH_UPCOMING_CUSTOMER_ORDERS,
    payload: brandibble.customers.orders(customerId, {status: 'upcoming'})
  };
}

//Public
export function fetchAllCustomerOrders(brandibble, customerId) {
  return dispatch => dispatch(_fetchAllCustomerOrders(...arguments));
}

export function fetchPastCustomerOrders(brandibble, customerId) {
  return dispatch => dispatch(_fetchPastCustomerOrders(...arguments));
}

export function fetchUpcomingCustomerOrders(brandibble, customerId) {
  return dispatch => dispatch(_fetchUpcomingCustomerOrders(...arguments));
}
