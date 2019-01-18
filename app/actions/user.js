import axios from 'axios';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie';

import store from '../store';
import config from '../config';
import httpOptions from '../service/http';

export const userMeAction = user => ({
  type: 'USER_ME',
  payload: user,
});

const subscribePusher = (user) => {
  const channelName = `presence-user-${user.id}`;

  Pusher.logToConsole = true;

  Pusher.Runtime.createXHR = () => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    return xhr;
  };

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

  console.log(channelName);

  channel.bind('message', (data) => {
    alert(JSON.stringify(data));
  });
};

const getAuthorizationData = () => {
  axios
    .get(config.URL_USER_ME, httpOptions)
    .then((response) => {
      if (response.data == null) {
        location.href = config.URL_INDEX;
      } else {
        subscribePusher(response.data);

        store.dispatch(userMeAction(response.data));
      }
    });
};

export default getAuthorizationData;
