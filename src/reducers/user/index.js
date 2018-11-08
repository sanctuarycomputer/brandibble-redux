import { combineReducers } from 'redux';
import attributes from './attributes';
import levelup from './levelup';
import validations from './validations';
import loyalties from './loyalties';

export default combineReducers({
  attributes,
  levelup,
  validations,
  loyalties,
});
