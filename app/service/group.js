import axios from 'axios';

import store from '../store';
import { messageTextFlushAction } from '../actions/message';
import { loadMessages } from './message';
import config from '../config';
import httpOptions from './http';
import { groupCollectionLoadSuccessAction, groupSelectAction } from '../actions/group';

export const buildGroups = (collection) => {
  const items = [];

  collection.forEach((group) => {
    group.photo = group.users[0].photo;
    group.name = group.users[0].name;

    items.push(group);
  });

  return items.sort((a, b) => {
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });
};

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
      if (response.data.length === 0) {
        return;
      }

      const groups = buildGroups(response.data);

      store.dispatch(groupSelectAction(groups[0]));
      store.dispatch(groupCollectionLoadSuccessAction(
        groups,
        groups[0],
      ));
      loadMessages(groups[0].id); // Load messages for the last selected group
    });
};
