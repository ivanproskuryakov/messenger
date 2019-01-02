import store from '../store';
import { userCollectionLoaded } from '../actions/user';

const sortUsersByName = (collection) => {
  return collection.sort((a, b) => {
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });
};

const fetchUsers = () => {
  fetch('/api/users.json')
    .then(response => response.json())
    .then(data => sortUsersByName(data))
    .then(data => store.dispatch(userCollectionLoaded(data)));
};

export default fetchUsers;
