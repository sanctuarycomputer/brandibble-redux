import { combineReducers } from 'redux';
import data from './data';
import error from './error';
import ref from './ref';
import session from './session';
import status from './status';
import user from './user';

export default combineReducers({
  data,
  error,
  ref,
  session,
  status,
  user,
});
