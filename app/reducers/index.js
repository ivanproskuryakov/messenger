import { combineReducers } from 'redux';
import users from './users';
import messages from './messages';

export default combineReducers({
  users,
  messages,
});
