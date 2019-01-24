import moment from 'moment';
import axios from 'axios';

import store from '../../store';
import config from '../../config';
import httpOptions from '../../helper/http';
import {
  messageEditAction,
  messageSendAction,
} from '../../actions/message';
import { formatMessages } from './loader';

const buildInstantMessage = (text, user) => {
  return {
    id: Math.random(),
    timestamp: moment()
      .unix(),
    text,
    user: {
      id: user.id,
    },
    readers: [
      {
        user: {
          id: user.id,
        },
      },
    ],
  };
};

export const sendMessage = () => {
  const state = store.getState();
  const { text } = state.message;
  const userId = state.room.selected.users[0].id;
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
      const m = buildInstantMessage(text, state.user.me);
      state.message.collection.push(m);

      const formatted = formatMessages(state.message.collection);

      // Dispatch event
      store.dispatch(messageSendAction(formatted));
    });
};

export const editText = (value) => {
  const state = store.getState().room;
  const selectedRoom = state.selected;

  // Dispatch event
  store.dispatch(messageEditAction(selectedRoom.id, value));
};
