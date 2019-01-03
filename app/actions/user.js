export const userSearch = name => ({
  type: 'USER_SEARCH',
  payload: name,
});

export const userSelect = user => ({
  type: 'USER_SELECT',
  payload: user,
});

export const userSelectById = userId => ({
  type: 'USER_SELECT_BY_ID',
  payload: userId,
});

export const userCollectionLoaded = users => ({
  type: 'USER_COLLECTION_LOADED',
  payload: users,
});
