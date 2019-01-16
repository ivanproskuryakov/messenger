import { combineReducers } from 'redux';
import user from './user';
import group from './group';
import message from './message';

export default combineReducers({
  user,
  group,
  message,
});
