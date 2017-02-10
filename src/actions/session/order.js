export const RESOLVE_ORDER = 'RESOLVE_ORDER';

function _resolveOrder(payload) {
  return { type: RESOLVE_ORDER, payload: payload }
}

export function resolveOrder(brandibble, serviceType='delivery') {
  const { orders } = brandibble;
  const currentOrder = orders.current();
  const payload = currentOrder ? Promise.resolve(currentOrder) : orders.create(null, serviceType).then(({data}) => data);

  return dispatch => dispatch(_resolveOrder(payload));
}
