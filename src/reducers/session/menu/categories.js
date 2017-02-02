import { MENU_FETCH } from 'actions/session/menu';

export default function menuCategories(state=null, action) {
  switch(action.type) {
    case `${MENU_FETCH}_FULFILLED`:
      return action.payload.categories;
    default:
      return state;
  }
}
