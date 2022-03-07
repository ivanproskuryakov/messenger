import axios from 'axios';

import store from '../../store';
import route from '../../config/route';
import httpOptions from '../../helper/http';
import { insertMockToMessages, updateMockedMessage } from './loader';
import { messageEditAction } from '../../actions/message';

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

export const sendMessage = () => {
  const state = store.getState();
  const { text } = state.message;
  const userId = state.room.selected.users[0].id;
  const url = `${route.URL_MESSAGE_SEND_USER}/${userId}`;

  if (text.trim().length === 0) {
    return;
  }

  const mock = mockMessage(text, state.user.me);

  insertMockToMessages(mock);

  axios
    .post(url, { text }, httpOptions)
    .then(() => {
      updateMockedMessage(mock);
    });
};

export const editText = (value) => {
  const state = store.getState().room;
  const selectedRoom = state.selected;

  // Dispatch event
  store.dispatch(messageEditAction(selectedRoom.id, value));
};
