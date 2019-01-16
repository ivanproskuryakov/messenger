import moment from 'moment';
import axios from 'axios';
import store from '../store';
import config from '../config';
import httpOptions from '../helper/http';

const myUserId = 2;

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

export const formatMessages = (messages) => {
  const formatted = [];

  for (let i = 0; i < messages.length; i += 1) {
    const m = messages[i];
    const previous = messages[i - 1];
    const next = messages[i + 1];

    m.classes = '';
    m.isFirst = false;
    m.my = myUserId === messages[i].user.id;

    if (i === 0) {
      m.classes += '__initial';
      m.isFirst = true;
    }

    if (previous) {
      if (previous.user.id !== m.user.id) {
        m.isFirst = true;
        m.classes += '__first';
      }
    }
    if (previous && !next) {
      m.classes += '__last';
    }
    if (next) {
      if (next.user.id !== m.user.id) {
        m.classes += '__last';
      }
    }

    formatted.push(m);
  }

  return formatted;
};

export const editMessage = (value) => {
  const state = store.getState().user;
  const selectedUser = state.selected;

  store.dispatch(messageEditAction(selectedUser.id, value));
};

export const sendMessage = () => {
  const state = store.getState().message;

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

    const messages = formatMessages(state.collection);

    store.dispatch(messageSendAction(messages));
  }
};

export const loadMessages = (groupId) => {
  const url = `${config.URL_GROUP_COLLECTION}/${groupId}`;

  axios
    .get(url, httpOptions)
    .then((response) => {
      console.log(response.data);

      // store.dispatch(
      //   messageCollectionLoadSuccessAction(userId, formatMessages(data)),
      // )
    });
};
