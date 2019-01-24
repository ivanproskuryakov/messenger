import store from '../../store';

/**
 * @param message
 * @returns int
 */
export const getReadTimeStamp = (message) => {
  const state = store.getState().user;
  const myUserId = state.me.id;
  let readAt = 0;

  message.readers.forEach((reader) => {
    if (reader.user.id === myUserId) {
      readAt = reader.timestamp;
    }
  });

  return readAt;
};

export const readMessage = (message) => {
  if (getReadTimeStamp(message) !== 0) {
    console.log('readMessage', message);
  }
};
