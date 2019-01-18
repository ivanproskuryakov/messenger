import axios from 'axios';
import store from '../store';
import config from '../config';
import httpOptions from '../service/http';
import { buildInstantMessage, formatMessages } from '../service/message';

export const messageSendAction = text => ({
  type: 'MESSAGE_SEND',
  payload: text,
});
export const messageEditAction = (groupId, text) => ({
  type: 'MESSAGE_EDIT',
  payload: {
    groupId,
    text,
  },
});
export const messageTextFlushAction = () => ({
  type: 'MESSAGE_TEXT_FLUSH',
});
export const messageCollectionLoadSuccessAction = (groupId, messages) => ({
  type: 'MESSAGE_COLLECTION_LOAD_SUCCESS',
  payload: {
    groupId,
    messages,
  },
});

export const editText = (value) => {
  const state = store.getState().group;
  const selectedGroup = state.selected;

  // Dispatch event
  store.dispatch(messageEditAction(selectedGroup.id, value));
};
export const sendMessage = () => {
  const state = store.getState();
  const { text } = state.message;
  const userId = state.group.selected.users[0].id;
  const url = `${config.URL_MESSAGE_USER}/${userId}`;

  if (text.trim().length === 0) {
    return;
  }

  axios
    .post(
      url,
      {
        text,
      },
      httpOptions,
    )
    .then(() => {
      const instantData = buildInstantMessage(text, state.user.me);
      state.message.collection.push(instantData);
      const formatted = formatMessages(state.message.collection);

      // Dispatch event
      store.dispatch(messageSendAction(formatted));
    });
};
export const loadMessages = (groupId) => {
  const url = `${config.URL_GROUP}${groupId}`;

  axios
    .get(
      url,
      httpOptions,
    )
    .then((response) => {
      const formatted = formatMessages(response.data.messages);

      // Dispatch event
      store.dispatch(messageCollectionLoadSuccessAction(groupId, formatted));
    });
};
