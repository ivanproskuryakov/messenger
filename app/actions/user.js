import axios from 'axios';
import store from '../store';
import config from '../config';
import httpOptions from '../service/http';

export const userMeAction = user => ({
  type: 'USER_ME',
  payload: user,
});

const getAuthorizationData = () => {
  axios
    .get(config.URL_USER_ME, httpOptions)
    .then((response) => {
      if (response.data == null) {
        location.href = config.URL_INDEX;
      } else {
        store.dispatch(userMeAction(response.data));
      }
    });
};

export default getAuthorizationData;
