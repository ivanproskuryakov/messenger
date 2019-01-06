import store from '../store';

export const userSearch = name => ({
  type: 'USER_SEARCH',
  payload: name,
});

export const userSelect = user => ({
  type: 'USER_SELECT',
  payload: user,
});

export const userCollectionLoadSuccess = (collection, selected) => ({
  type: 'USER_COLLECTION_LOAD_SUCCESS',
  payload: {
    collection,
    selected,
  },
});

const findUserById = (collection, userId) => {
  return collection
    .filter(item => item.id === Number(userId))[0];
};

const sortUsersByLastMessageTimestamp = (collection) => {
  return collection.sort((a, b) => {
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });
};

export const loadUsers = (userId) => {
  fetch('/api/users.json')
    .then(response => response.json())
    .then(users => sortUsersByLastMessageTimestamp(users))
    .then(users => store.dispatch(userCollectionLoadSuccess(
      users,
      findUserById(users, userId),
    )));
};
