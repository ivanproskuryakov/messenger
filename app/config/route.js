import params from './params';

const host = params.API_HOST;

console.log('API HOST ----->', host);

const route = {
  URL_INDEX: `${host}`,
  URL_LOGOUT: `${host}/logout`,
  URL_SETTINGS: `${host}/profile/settings/edit/`,
  URL_HELP: `${host}/help/z78`,
  URL_PROFILE: `${host}/profile`,
  URL_USER_AUTHORIZE_SUCCESS: `${host}/api/user/me`,
  URL_PUSHER_AUTH: `${host}/api/messenger/pusher/authPresence`,
  URL_PUSHER_ONLINE: `${host}/api/messenger/pusher/authOnline`,
  URL_ROOM: `${host}/api/messenger/room`,
  URL_MESSAGE_SEND_USER: `${host}/api/messenger/message/user`,
  URL_MESSAGE_READ: `${host}/api/messenger/message`,
};

export default route;
