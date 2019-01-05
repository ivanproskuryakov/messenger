export const messageSend = text => ({
  type: 'MESSAGE_SEND',
  payload: text,
});

export const messageEdit = text => ({
  type: 'MESSAGE_EDIT',
  payload: text,
});

export const messageCollectionLoaded = (user, messages) => ({
  type: 'MESSAGE_COLLECTION_LOADED',
  payload: {
    user,
    messages,
  },
});
