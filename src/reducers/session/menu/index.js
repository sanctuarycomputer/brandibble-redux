import { combineReducers } from 'redux';
import attributes from './attributes';
import categories from './categories';
import products from './products';

export default combineReducers({
  attributes,
  categories,
  products,
});
