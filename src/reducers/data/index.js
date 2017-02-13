import { combineReducers } from 'redux';
import allergens from './allergens';
import locations from './locations';

export default combineReducers({
  allergens,
  locations,
});
