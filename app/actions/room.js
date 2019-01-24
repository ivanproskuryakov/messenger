export const roomSearchAction = name => ({
  type: 'GROUP_SEARCH',
  payload: name,
});
export const roomSelectAction = room => ({
  type: 'GROUP_SELECT',
  payload: room,
});
export const roomCollectionLoadSuccessAction = (collection, selected) => ({
  type: 'GROUP_COLLECTION_LOAD_SUCCESS',
  payload: {
    collection,
    selected,
  },
});
