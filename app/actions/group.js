import axios from 'axios';
import store from '../store';
import config from '../config';
import { loadMessages, messageTextFlushAction } from './message';
import buildUsers from '../service/group';
import httpOptions from '../service/http';

export const groupSearchAction = name => ({
  type: 'GROUP_SEARCH',
  payload: name,
});
export const groupSelectAction = group => ({
  type: 'GROUP_SELECT',
  payload: group,
});
export const groupCollectionLoadSuccessAction = (collection, selected) => ({
  type: 'GROUP_COLLECTION_LOAD_SUCCESS',
  payload: {
    collection,
    selected,
  },
});

export const selectGroup = (group) => {
  store.dispatch(groupSelectAction(group));
  store.dispatch(messageTextFlushAction());
};

export const loadGroups = () => {
  axios
    .get(
      config.URL_GROUP,
      httpOptions,
    )
    .then((response) => {
      const users = buildUsers(response.data);

      store.dispatch(groupSelectAction(users[0]));
      store.dispatch(groupCollectionLoadSuccessAction(
        users,
        users[0],
      ));

      loadMessages(users[0].id); // Load messages for the last selected group
    });
};
