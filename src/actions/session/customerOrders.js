import fireAction from 'utils/fireAction';
import handleErrors from 'utils/handleErrors';

export const FETCH_ALL_CUSTOMER_ORDERS = 'FETCH_ALL_CUSTOMER_ORDERS';
export const FETCH_PAST_CUSTOMER_ORDERS = 'FETCH_PAST_CUSTOMER_ORDERS';
export const FETCH_UPCOMING_CUSTOMER_ORDERS = 'FETCH_UPCOMING_CUSTOMER_ORDERS';

const _fetchCustomerOrders = (brandibble, customerId, status = 'both', limit = 10) => {
  return brandibble.customers.orders(customerId, { status, limit }).catch(handleErrors);
};

export const fetchAllCustomerOrders = (brandibble, customerId, limit = 20) => (dispatch) => {
  const payload = _fetchCustomerOrders(brandibble, customerId, 'both', limit);
  return dispatch(fireAction(FETCH_ALL_CUSTOMER_ORDERS, payload));
};

export const fetchPastCustomerOrders = (brandibble, customerId, limit = 10) => (dispatch) => {
  const payload = _fetchCustomerOrders(brandibble, customerId, 'past', limit);
  return dispatch(fireAction(FETCH_PAST_CUSTOMER_ORDERS, payload));
};

export const fetchUpcomingCustomerOrders = (brandibble, customerId, limit = 10) => (dispatch) => {
  const payload = _fetchCustomerOrders(brandibble, customerId, 'upcoming', limit);
  return dispatch(fireAction(FETCH_UPCOMING_CUSTOMER_ORDERS, payload));
};
