import Immutable from 'seamless-immutable';
import {
  RESOLVE_ORDER_LOCATION
} from 'actions/session/order';
import {
  PUSH_GEOLOCATION,
  FETCH_LOCATION,
  FETCH_LOCATIONS,
} from 'actions/data/locations';

export const initialState = Immutable({
  locationsById: Immutable({}),
});

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case PUSH_GEOLOCATION:
      return state.setIn(['locationsById', payload.location_id], payload);
    case `${FETCH_LOCATION}_FULFILLED`:
    case `${RESOLVE_ORDER_LOCATION}_FULFILLED`:
      if (payload) return state.setIn(['locationsById', payload.location_id], payload);
      return state;
    case `${FETCH_LOCATIONS}_FULFILLED`:
      return state.merge({
        locationsById: state.locationsById.replace(Immutable.asObject(payload, (location) => {
          return [location.location_id, location];
        })),
      });
    default:
      return state;
  }
};
