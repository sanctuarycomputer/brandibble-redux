import { combineReducers } from 'redux';
import data from './data';
import session from './session';
import user from './user';

export default combineReducers({
  data,
  session,
  user,
});
