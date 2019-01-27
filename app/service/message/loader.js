import axios from 'axios';

import store from '../../store';
import route from '../../config/route';
import httpOptions from '../../helper/http';
import { messageCollectionLoadSuccessAction, messageSendAction } from '../../actions/message';

const formatMessages = (messages) => {
  const myUserId = store
    .getState()
    .user.me.id;
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

export const updateMockedMessage = (mock) => {
  let messages = store
    .getState()
    .message
    .collection;

  messages = messages.map((message) => {
    if (message.id === mock.id) {
      message.mocked = false;
    }

    return message;
  });

  // Dispatch event
  store.dispatch(messageSendAction(messages));
};

export const insertMockToMessages = (message) => {
  const messages = store
    .getState()
    .message
    .collection;

  messages.push(message);

  const formatted = formatMessages(messages);

  // Dispatch event
  store.dispatch(messageSendAction(formatted));
};

export const loadMessages = (roomId) => {
  const url = `${route.URL_ROOM}/${roomId}/messages`;

  axios
    .get(
      url,
      httpOptions,
    )
    .then((response) => {
      const formatted = formatMessages(response.data);

      // Dispatch event
      store.dispatch(messageCollectionLoadSuccessAction(roomId, formatted));
    });
};

