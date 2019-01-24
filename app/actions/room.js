export const roomSearchAction = name => ({
  type: 'ROOM_SEARCH',
  payload: name,
});
export const roomSelectAction = room => ({
  type: 'ROOM_SELECT',
  payload: room,
});
export const roomCollectionLoadSuccessAction = (collection, selected) => ({
  type: 'ROOM_COLLECTION_LOAD_SUCCESS',
  payload: {
    collection,
    selected,
  },
});
