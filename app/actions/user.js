import axios from 'axios';
import Cookies from 'js-cookie';

import store from '../store';
import config from '../config';
import { messageTextFlushAction } from './message';

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

export const selectUser = (user) => {
  store.dispatch(userSelectAction(user));
  store.dispatch(messageTextFlushAction());
};

export const loadUsers = () => {
  fetch(config.URL_USER_COLLECTION)
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

export const getAuthorizationData = () => {
  const options = {
    withCredentials: true,
    headers: {
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
    },
  };

  axios
    .get(config.URL_USER_ME, options)
    .then((response) => {
      console.log(response.data);
    });
};
