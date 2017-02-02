import { MENU_FETCH } from 'actions/session/menu';

export default function menuProducts(state=null, action) {
  switch(action.type) {
    case `${MENU_FETCH}_FULFILLED`:
      return action.payload.products;
    default:
      return state;
  }
}
