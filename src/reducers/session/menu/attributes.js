import { MENU_FETCH } from 'actions/session/menu';

export default function menu(state=null, action) {
  switch(action.type) {
    case `${MENU_FETCH}_FULFILLED`:
      return action.payload.attributes;
    default:
      return state;
  }
}
