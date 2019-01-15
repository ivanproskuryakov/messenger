import axios from 'axios';
import Cookies from 'js-cookie';

import store from '../store';
import config from '../config';
import { messageTextFlushAction } from './message';
import buildUsers from '../service/user';

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
  const options = {
    withCredentials: true,
    headers: {
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
    },
  };

  axios
    .get(config.URL_USER_COLLECTION, options)
    .then((response) => {
      const users = buildUsers(response.data);

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
      if (response.data == null) {
        location.href = config.URL_INDEX;
      } else {
        store.dispatch(userMeAction(response.data));
      }
    });
};
