import store from '../store';
import { userCollectionLoaded, userSelectById } from '../actions/user';

const sortUsersByLastMessageTimestamp = (collection) => {
  return collection.sort((a, b) => {
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });
};

const fetchUsers = (userId) => {
  fetch('/api/users.json')
    .then(response => response.json())
    .then(data => sortUsersByLastMessageTimestamp(data))
    .then(data => store.dispatch(userCollectionLoaded(data)))
    .then(() => store.dispatch(userSelectById(userId)));
};

export default fetchUsers;
