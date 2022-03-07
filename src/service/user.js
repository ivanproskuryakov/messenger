import axios from 'axios';

import route from '../config/route';
import httpOptions from '../helper/http';
import store from '../store';
import authorizeSuccessAction from '../actions/user';
import { subscribePusherUserChannel, subscribePusherOnlineChannel } from './pusher';

const authorizeUser = () => {
  axios
    .get(
      route.URL_USER_AUTHORIZE,
      httpOptions,
    )
    .then((response) => {
      if (response.data == null) {
        location.href = route.URL_INDEX;
      } else {
        const user = response.data;

        subscribePusherUserChannel(user);
        subscribePusherOnlineChannel();

        // Dispatch event
        store.dispatch(authorizeSuccessAction(user));
      }
    });
};

export default authorizeUser;
