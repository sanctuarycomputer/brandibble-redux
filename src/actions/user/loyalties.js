/* eslint no-shadow:1 */
import fireAction from '../../utils/fireAction';
import handleErrors from '../../utils/handleErrors';

export const FETCH_CUSTOMER_LOYALTIES = 'FETCH_CUSTOMER_LOYALTIES';

export const fetchLoyalties = (brandibble, customer_id) => (dispatch) => {
  const payload = brandibble.customers.loyalties(customer_id).then(({ data }) => data).catch(handleErrors);
  return dispatch(fireAction(FETCH_CUSTOMER_LOYALTIES, payload));
};