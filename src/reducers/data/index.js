import { combineReducers } from 'redux';
import allergens from './allergens';
import brands from './brands';
import locations from './locations';
import geolocations from './geolocations';
import customerOrders from './customerOrders';
import images from './images';

export default combineReducers({
  allergens,
  brands,
  locations,
  geolocations,
  customerOrders,
  images,
});
