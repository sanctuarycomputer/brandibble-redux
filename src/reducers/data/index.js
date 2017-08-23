import { combineReducers } from 'redux';
import allergens from './allergens';
import locations from './locations';
import geolocations from './geolocations';
import customerOrders from './customerOrders';

export default combineReducers({
  allergens,
  locations,
  geolocations,
  customerOrders,
});
