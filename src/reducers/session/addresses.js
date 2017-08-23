import Immutable from 'seamless-immutable';
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  FETCH_ADDRESSES,
} from 'actions/session/addresses';
import { UNAUTHENTICATE_USER } from 'actions/session/user';

export const initialState = Immutable({
  addressesById: Immutable({}),
});

export default function addresses(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case `${FETCH_ADDRESSES}_FULFILLED`:
      return state.merge({
        addressesById: state.addressesById.replace(Immutable.asObject(payload, (address) => {
          return [address.customer_address_id, address];
        })),
      });
    case `${DELETE_ADDRESS}_FULFILLED`:
      return state.merge({
        addressesById: state.addressesById.without(payload),
      });
    case `${CREATE_ADDRESS}_FULFILLED`:
      return state.setIn(['addressesById', payload.customer_address_id], payload);
    case `${UNAUTHENTICATE_USER}_FULFILLED`:
      return initialState;
    default:
      return state;
  }
}
