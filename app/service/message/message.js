import axios from 'axios';
import store from '../../store';
import httpOptions from '../../helper/http';
import config from '../../config';

/**
 * @param message
 * @returns int
 */
const isMessageReadByMe = (message) => {
  const state = store.getState().user;
  const myUserId = state.me.id;
  let readAt = 0;

  message.readers.forEach((reader) => {
    if (reader.user.id === myUserId) {
      readAt = reader.timestamp;
    }
  });

  return readAt;
};

const readMessage = (message) => {
  if (isMessageReadByMe(message)) {
    return;
  }

  const url = `${config.URL_MESSAGE_READ}/${message.id}/read`;

  axios
    .post(url, {}, httpOptions)
    .then(() => {
      console.log('readMessage', message);
    });
};

export default readMessage;
