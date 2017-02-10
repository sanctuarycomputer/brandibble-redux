import { combineReducers } from 'redux';
import locations from './locations';
import menus from './menus';
import order from './order';

export default combineReducers({
  locations,
  menus,
  order,
});
