import axios from 'axios';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie';

import store from '../store';
import config from '../config';
import httpOptions from '../service/http';
import { formatMessages } from '../service/message';
import { messageSendAction } from './message';

export const userMeAction = user => ({
  type: 'USER_ME',
  payload: user,
});

const subscribePusher = (user) => {
  Pusher.logToConsole = true;
  Pusher.Runtime.createXHR = () => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    return xhr;
  };

  const channelName = `presence-user-${user.id}`;
  const pusher = new Pusher(config.PUSHER_KEY, {
    cluster: config.PUSHER_CLUSTER,
    authEndpoint: config.URL_PUSHER_AUTH,
    auth: {
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
      },
    },
  });

  const channel = pusher.subscribe(channelName);

  channel.bind('message', (data) => {
    const state = store.getState();

    state.message.collection.push(data);
    const formatted = formatMessages(state.message.collection);

    // Dispatch event
    store.dispatch(messageSendAction(formatted));
  });
};

const authorizeUser = () => {
  axios
    .get(
      config.URL_USER_ME,
      httpOptions,
    )
    .then((response) => {
      if (response.data == null) {
        location.href = config.URL_INDEX;
      } else {
        subscribePusher(response.data);

        // Dispatch event
        store.dispatch(userMeAction(response.data));
      }
    });
};

export default authorizeUser;
