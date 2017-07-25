import Immutable from 'seamless-immutable';
import {
  FETCH_LOCATION,
  FETCH_LOCATIONS,
} from 'actions/data/locations';

export const initialState = Immutable({
  locationsById: Immutable({}),
});

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case `${FETCH_LOCATION}_FULFILLED`:
      return state.setIn(['locationsById', payload.location_id], payload);
    case `${FETCH_LOCATIONS}_FULFILLED`:
      return state.merge({
        locationsById: state.locationsById.merge(Immutable.asObject(payload, (location) => {
          return [location.location_id, location];
        })),
      });
    default:
      return state;
  }
};
