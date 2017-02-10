import { combineReducers } from 'redux';
import data from './data';
import ref from './ref';
import session from './session';
import status from './status';
import user from './user';

export default combineReducers({
  data,
  ref,
  session,
  status,
  user,
});
