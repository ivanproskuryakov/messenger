import axios from 'axios';
import store from '../store';
import config from '../config';
import { loadMessages, messageTextFlushAction } from './message';
import buildGroups from '../service/group';
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
      const groups = buildGroups(response.data);

      store.dispatch(groupSelectAction(groups[0]));
      store.dispatch(groupCollectionLoadSuccessAction(
        groups,
        groups[0],
      ));

      loadMessages(groups[0].id); // Load messages for the last selected group
    });
};
