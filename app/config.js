const apiHost = window
  .location
  .origin
  .replace('messenger.', '')
  .replace('8080', '80'); // in case of development environment

console.log('API HOST ----->', apiHost);

const config = {
  URL_INDEX: `${apiHost}`,
  URL_LOGOUT: `${apiHost}/logout`,
  URL_SETTINGS: `${apiHost}/profile/settings/edit/`,
  URL_HELP: `${apiHost}/help/z78`,
  URL_PROFILE: `${apiHost}/profile`,

  URL_USER_ME: `${apiHost}/api/user/me`,
  URL_GROUP: `${apiHost}/api/messenger/group/`,
  URL_MESSAGE: `${apiHost}/api/messenger/message/`,
};

export default config;
