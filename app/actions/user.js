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

const subscribePusher = (id) => {
  Pusher.logToConsole = true;

  const pusher = new Pusher(config.PUSHER_KEY, {
    cluster: config.PUSHER_CLUSTER,
    authEndpoint: config.URL_PUSHER_AUTH,
    auth: {
      headers: {
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
      },
    },
  });

  const channel = pusher.subscribe(`presence-user-${id}`);

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
