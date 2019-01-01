export const userSearch = name => ({
  type: 'USER_SEARCH',
  name,
});

export const userSelect = user => ({
  type: 'USER_SELECT',
  user,
});
