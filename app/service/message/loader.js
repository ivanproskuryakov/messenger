import axios from 'axios';

import store from '../../store';
import config from '../../config';
import httpOptions from '../../helper/http';
import { messageCollectionLoadSuccessAction } from '../../actions/message';

export const formatMessages = (messages) => {
  const state = store.getState().user;
  const myUserId = state.me.id;
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

export const loadMessages = (roomId) => {
  const url = `${config.URL_ROOM}/${roomId}/messages`;

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

