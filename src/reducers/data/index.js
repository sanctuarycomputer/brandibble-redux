import { combineReducers } from 'redux';
import allergens from './allergens';
import locations from './locations';
import customerOrders from './customerOrders';

export default combineReducers({
  allergens,
  locations,
  customerOrders,
});
