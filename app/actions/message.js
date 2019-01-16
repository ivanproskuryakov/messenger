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

export const editMessage = (value) => {
  const state = store.getState().user;
  const selectedUser = state.selected;

  store.dispatch(messageEditAction(selectedUser.id, value));
};

export const sendMessage = () => {
  const state = store.getState().message;
  const myUserId = state.me.id;

  if (state.text.trim().length !== 0) {
    const message = {
      id: Math.random(),
      text: state.text,
      timestamp: moment()
        .unix(),
      user: {
        id: myUserId, // current user id
      },
    };

    state.collection.push(message);

    const formatted = formatMessages(state.collection);

    store.dispatch(messageSendAction(formatted));
  }
};

export const loadMessages = (groupId) => {
  const url = `${config.URL_GROUP_COLLECTION}/${groupId}`;

  axios
    .get(url, httpOptions)
    .then((response) => {
      const formatted = formatMessages(response.data.messages);

      console.log(response.data);
      console.log(formatted);

      store.dispatch(messageCollectionLoadSuccessAction(groupId, formatted));
    });
};
