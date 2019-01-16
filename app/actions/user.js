import axios from 'axios';
import store from '../store';
import config from '../config';
import httpOptions from '../service/http';
import { userMeAction } from './group';

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
