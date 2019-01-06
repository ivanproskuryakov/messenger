export const messageSend = text => ({
  type: 'MESSAGE_SEND',
  payload: text,
});

export const messageEdit = text => ({
  type: 'MESSAGE_EDIT',
  payload: text,
});

export const messageCollectionLoad = userId => ({
  type: 'MESSAGE_COLLECTION_LOAD',
  payload: userId,
});
