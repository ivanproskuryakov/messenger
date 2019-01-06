import store from '../store';
import { userCollectionLoaded, userSelectById } from '../actions/user';

const sortUsersByLastMessageTimestamp = (collection) => {
  return collection.sort((a, b) => {
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });
};

const loadUsers = (userId) => {
  fetch('/api/users.json')
    .then(response => response.json())
    .then(data => sortUsersByLastMessageTimestamp(data))
    .then(orderedUsers => store.dispatch(userCollectionLoaded(orderedUsers)))
    .then(() => {
      if (userId) {
        store.dispatch(userSelectById(userId));
      }
    });
};

export default loadUsers;
