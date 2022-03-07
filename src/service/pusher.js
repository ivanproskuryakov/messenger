import Pusher from 'pusher-js';
import Cookies from 'js-cookie';

import params from '../config/params/index';
import route from '../config/route';
import { loadMessages } from './message/loader';
import {
  updateOnlineStatuses,
  updateOnlineStatusesMemberAdded,
  updateOnlineStatusesMemberRemoved,
} from './room';

const EVENT_NEW_MESSAGE = 'message';
const EVENT_READ_MESSAGE = 'read';

const getPusher = (url) => {
  Pusher.logToConsole = true;
  Pusher.Runtime.createXHR = () => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    return xhr;
  };

  const pusher = new Pusher(params.PUSHER_KEY, {
    cluster: params.PUSHER_CLUSTER,
    authEndpoint: url,
    auth: {
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
      },
    },
  });

  return pusher;
};

export const subscribePusherOnlineChannel = () => {
  const pusher = getPusher(route.URL_PUSHER_ONLINE);
  const channelName = 'presence-online';

  const channel = pusher.subscribe(channelName);

  channel.bind('pusher:subscription_succeeded', (data) => {
    updateOnlineStatuses(data);
  });
  channel.bind('pusher:member_added', (data) => {
    updateOnlineStatusesMemberAdded(data);
  });
  channel.bind('pusher:member_removed', (data) => {
    updateOnlineStatusesMemberRemoved(data);
  });
};

export const subscribePusherUserChannel = (user) => {
  const pusher = getPusher(route.URL_PUSHER_AUTH);
  const channelName = `presence-user-${user.id}`;

  const channel = pusher.subscribe(channelName);

  channel.bind('pusher:subscription_succeeded', () => {
    // empty
  });
  channel.bind(EVENT_NEW_MESSAGE, (data) => {
    console.log(data);
    console.log(data.room.id);

    loadMessages(data.room.id); // Load messages for the last selected room
  });
  channel.bind(EVENT_READ_MESSAGE, (data) => {
    console.log(data);
    console.log(data.room.id);

    loadMessages(data.room.id); // Load messages for the last selected room
  });
};
