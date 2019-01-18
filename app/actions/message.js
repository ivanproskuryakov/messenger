export const messageSendAction = messages => ({
  type: 'MESSAGE_SEND',
  payload: messages,
});
export const messageEditAction = (groupId, text) => ({
  type: 'MESSAGE_EDIT',
  payload: {
    groupId,
    text,
  },
});
export const messageTextFlushAction = () => ({
  type: 'MESSAGE_TEXT_FLUSH',
});
export const messageCollectionLoadSuccessAction = (groupId, messages) => ({
  type: 'MESSAGE_COLLECTION_LOAD_SUCCESS',
  payload: {
    groupId,
    messages,
  },
});
