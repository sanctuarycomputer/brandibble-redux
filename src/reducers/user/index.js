import { combineReducers } from 'redux';
import attributes from './attributes';
import validations from './validations';

export default combineReducers({
  attributes,
  validations,
});
