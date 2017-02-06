import { combineReducers } from 'redux';
import locations from './locations';
import menus from './menus';

export default combineReducers({
  locations,
  menus,
});
