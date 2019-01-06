export const userSearch = name => ({
  type: 'USER_SEARCH',
  payload: name,
});

export const userSelect = user => ({
  type: 'USER_SELECT',
  payload: user,
});

export const loadUsers = userId => ({
  type: 'USER_COLLECTION_LOAD',
  payload: userId,
});
