import params from './params/index';

const host = params.API_HOST;
const route = {
  URL_INDEX: `${host}`,
  URL_LOGOUT: `${host}/logout`,
  URL_SETTINGS: `${host}/profile/settings/edit/`,
  URL_HELP: `${host}/help/z78`,
  URL_PROFILE: `${host}/profile`,

  URL_PUSHER_AUTH: `${host}/api/messenger/pusher/authPresence`,
  URL_PUSHER_ONLINE: `${host}/api/messenger/pusher/authOnline`,

  URL_USER_AUTHORIZE: `${host}/api/messenger/me.json`,
  URL_ROOM: `${host}/api/messenger/room.json`,
  URL_MESSAGE_SEND_USER: `${host}/api/messenger/message/user`,
  URL_MESSAGE_READ: `${host}/api/messenger/message`,
};

export default route;
