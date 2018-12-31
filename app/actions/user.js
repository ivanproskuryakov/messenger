export const userSearch = name => ({
  type: 'USER_SEARCH',
  name,
});

export const userSelect = name => ({
  type: 'USER_SELECT',
  name,
});

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};
