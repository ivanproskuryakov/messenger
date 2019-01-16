import moment from 'moment';
import axios from 'axios';
import store from '../store';
import config from '../config';
import httpOptions from '../service/http';
import formatMessages from '../service/message';

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

  if (state.message.text.trim().length === 0) {
    return;
  }

  const data = {
    text: state.message.text,
    group: {
      id: state.user.selected.id,
    },
  };
  const instantData = {
    id: state.user.me.id,
    text: data.text,
    timestamp: moment()
      .unix(),
    user: state.user.me,
  };

  state.message.collection.push(instantData);

  const formatted = formatMessages(state.message.collection);

  store.dispatch(messageSendAction(formatted));

  axios
    .post(config.URL_GROUP, data, httpOptions)
    .then((response) => {
      console.log(response);
    });
};

export const loadMessages = (groupId) => {
  const url = `${config.URL_GROUP}${groupId}`;

  axios
    .get(url, httpOptions)
    .then((response) => {
      const formatted = formatMessages(response.data.messages);

      console.log(response.data);
      console.log(formatted);

      store.dispatch(messageCollectionLoadSuccessAction(groupId, formatted));
    });
};
