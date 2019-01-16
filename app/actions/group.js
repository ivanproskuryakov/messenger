import axios from 'axios';
import store from '../store';
import config from '../config';
import { loadMessages, messageTextFlushAction } from './message';
import buildUsers from '../service/group';
import httpOptions from '../service/http';

export const userSearchAction = name => ({
  type: 'USER_SEARCH',
  payload: name,
});
export const userMeAction = user => ({
  type: 'USER_ME',
  payload: user,
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

export const selectUser = (user) => {
  store.dispatch(userSelectAction(user));
  store.dispatch(messageTextFlushAction());
};

export const loadUsers = () => {
  axios
    .get(
      config.URL_GROUP,
      httpOptions,
    )
    .then((response) => {
      const users = buildUsers(response.data);

      store.dispatch(userSelectAction(users[0]));
      store.dispatch(userCollectionLoadSuccessAction(
        users,
        users[0],
      ));

      loadMessages(users[0].id); // Load messages for the last selected user
    });
};
