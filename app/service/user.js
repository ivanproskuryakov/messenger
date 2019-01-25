import axios from 'axios';

import config from '../config';
import httpOptions from '../helper/http';
import store from '../store';
import authorizeSuccessAction from '../actions/user';
import { subscribePusherUserChannel, subscribePusherOnlineChannel } from './pusher';

const authorizeUser = () => {
  axios
    .get(
      config.URL_USER_AUTHORIZE_SUCCESS,
      httpOptions,
    )
    .then((response) => {
      if (response.data == null) {
        location.href = config.URL_INDEX;
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
