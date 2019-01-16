import axios from 'axios';
import store from '../store';
import config from '../config';
import httpOptions from '../service/http';
import { buildInstantMessage, buildMessage, formatMessages } from '../service/message';

export const messageSendAction = text => ({
  type: 'MESSAGE_SEND',
  payload: text,
});
export const messageEditAction = (userId, text) => ({
  type: 'MESSAGE_EDIT',
  payload: {
    userId,
    text,
  },
});
export const messageTextFlushAction = () => ({
  type: 'MESSAGE_TEXT_FLUSH',
});
export const messageCollectionLoadSuccessAction = (userId, messages) => ({
  type: 'MESSAGE_COLLECTION_LOAD_SUCCESS',
  payload: {
    userId,
    messages,
  },
});

export const editText = (value) => {
  const state = store.getState().user;
  const selectedUser = state.selected;

  store.dispatch(messageEditAction(selectedUser.id, value));
};

export const sendMessage = () => {
  const state = store.getState();
  const { text } = state.message;

  if (text.trim().length === 0) {
    return;
  }

  const data = buildMessage(text, state.user.selected);
  const instantData = buildInstantMessage(text, state.user.me);

  axios
    .post(
      config.URL_MESSAGE,
      data,
      httpOptions,
    )
    .then(() => {
      state.message.collection.push(instantData);
      const formatted = formatMessages(state.message.collection);

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

      store.dispatch(messageCollectionLoadSuccessAction(groupId, formatted));
    });
};
