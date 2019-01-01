export const userSearch = name => ({
  type: 'USER_SEARCH',
  payload: name,
});

export const userSelect = user => ({
  type: 'USER_SELECT',
  payload: user,
});

export const userCollectionLoaded = users => ({
  type: 'USER_COLLECTION_LOADED',
  payload: users,
});
