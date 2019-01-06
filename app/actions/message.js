import moment from 'moment';
import store from '../store';

const myUserId = 2;

export const messageSend = text => ({
  type: 'MESSAGE_SEND',
  payload: text,
});

export const messageEdit = text => ({
  type: 'MESSAGE_EDIT',
  payload: text,
});

export const messageCollectionLoadSuccess = (userId, messages) => ({
  type: 'MESSAGE_COLLECTION_LOAD_SUCCESS',
  payload: {
    userId,
    messages,
  },
});

const formatMessages = (messages) => {
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

export const buildMessage = (text) => {
  return {
    id: Math.random(),
    text,
    timestamp: moment()
      .unix(),
    user: {
      id: myUserId, // current user id
    },
  };
};

export const loadMessages = (userId) => {
  fetch(`/api/messages/${userId}.json`)
    .then(response => response.json())
    .then(data => store.dispatch(
      messageCollectionLoadSuccess(userId, formatMessages(data)),
    ));
};
