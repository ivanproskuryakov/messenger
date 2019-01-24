import { combineReducers } from 'redux';
import user from './user';
import room from './room';
import message from './message';

export default combineReducers({
  user,
  room,
  message,
});
