import store from '../store';

export const userSearchAction = name => ({
  type: 'USER_SEARCH',
  payload: name,
});

export const userSelectAction = user => ({
  type: 'USER_SELECT',
  payload: user,
});

export const userCollectionLoadSuccessAction = (collection, selected) => ({
  type: 'USER_COLLECTION_LOAD_SUCCESS',
  payload: {
    collection,
    selected,
  },
});

const sortUsersByLastMessageTimestamp = (collection) => {
  return collection.sort((a, b) => {
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });
};

export const loadUsers = () => {
  fetch('/api/users.json')
    .then(response => response.json())
    .then(users => sortUsersByLastMessageTimestamp(users))
    .then((users) => {
      store.dispatch(userSelectAction(users[0]));
      store.dispatch(userCollectionLoadSuccessAction(
        users,
        users[0],
      ));
    });
};
