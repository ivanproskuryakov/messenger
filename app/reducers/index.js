import { combineReducers } from 'redux';
import user from './user';
import message from './message';

export default combineReducers({
  user,
  message,
});
