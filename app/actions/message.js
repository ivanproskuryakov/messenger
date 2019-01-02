export const messageAdd = text => ({
  type: 'MESSAGE_ADD',
  payload: text,
});

export const messageCollectionLoaded = messages => ({
  type: 'MESSAGE_COLLECTION_LOADED',
  payload: messages,
});
