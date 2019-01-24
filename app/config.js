const apiHost = window
  .location
  .origin
  .replace('messenger.', '')
  .replace('8080', '80'); // in case of development environment

console.log('API HOST ----->', apiHost);

const config = {
  PUSHER_KEY: '8694afcdaba2044a05c8',
  PUSHER_CLUSTER: 'eu',

  URL_INDEX: `${apiHost}`,
  URL_LOGOUT: `${apiHost}/logout`,
  URL_SETTINGS: `${apiHost}/profile/settings/edit/`,
  URL_HELP: `${apiHost}/help/z78`,
  URL_PROFILE: `${apiHost}/profile`,

  URL_USER_AUTHORIZE_SUCCESS: `${apiHost}/api/user/me`,
  URL_PUSHER_AUTH: `${apiHost}/api/messenger/pusher/auth`,
  URL_ROOM: `${apiHost}/api/messenger/room`,
  URL_MESSAGE_USER: `${apiHost}/api/messenger/message/user`,
};

export default config;
