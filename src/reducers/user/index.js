import { combineReducers } from 'redux';
import attributes from './attributes';
import orders from './orders';
import levelup from './levelup';
import validations from './validations';

export default combineReducers({
  attributes,
  levelup,
  orders,
  validations,
});
