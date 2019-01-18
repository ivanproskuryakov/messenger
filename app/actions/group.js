export const groupSearchAction = name => ({
  type: 'GROUP_SEARCH',
  payload: name,
});
export const groupSelectAction = group => ({
  type: 'GROUP_SELECT',
  payload: group,
});
export const groupCollectionLoadSuccessAction = (collection, selected) => ({
  type: 'GROUP_COLLECTION_LOAD_SUCCESS',
  payload: {
    collection,
    selected,
  },
});
