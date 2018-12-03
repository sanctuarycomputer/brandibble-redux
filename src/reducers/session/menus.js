import { FETCH_MENU } from '../../actions/session/menus';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload, meta } = action;

  switch (type) {
    case `${FETCH_MENU}_FULFILLED`:
      return {
        ...state,
        [meta.menuKey]: payload,
      };
    default:
      return state;
  }
};
