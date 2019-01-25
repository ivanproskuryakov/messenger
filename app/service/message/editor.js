import axios from 'axios';

import store from '../../store';
import config from '../../config';
import httpOptions from '../../helper/http';
import { formatMessages } from './loader';
import {
  messageEditAction,
  messageSendAction,
} from '../../actions/message';

const mockMessage = (text, user) => {
  return {
    mocked: true,
    id: Math.random(),
    timestamp: Date.now(),
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

export const updateCollectionWithMessage = (message) => {
  const state = store.getState();
  const messages = state.message.collection;

  messages.push(message);

  const formatted = formatMessages(messages);

  // Dispatch event
  store.dispatch(messageSendAction(formatted));
};

export const sendMessage = () => {
  const state = store.getState();
  const { text } = state.message;
  const userId = state.room.selected.users[0].id;
  const url = `${config.URL_MESSAGE_SEND_USER}/${userId}`;

  if (text.trim().length === 0) {
    return;
  }

  const message = mockMessage(text, state.user.me);

  updateCollectionWithMessage(message);

  axios
    .post(url, { text }, httpOptions)
    .then(() => {
    });
};

export const editText = (value) => {
  const state = store.getState().room;
  const selectedRoom = state.selected;

  // Dispatch event
  store.dispatch(messageEditAction(selectedRoom.id, value));
};
