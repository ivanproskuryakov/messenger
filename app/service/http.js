import Cookies from 'js-cookie';

const options = {
  withCredentials: true,
  headers: {
    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
  },
};

export default options;
