const initialState = {
  collection: [],
  selected: {},
  search: '',
};

const queryCollection = (query) => {
  return initialState
    .collection
    .filter(item => item.name.toLowerCase()
      .match(query));
};

const findUserById = (collection, userId) => {
  if (userId) {
    return collection
      .filter(item => item.id === Number(userId))[0];
  }

  return {};
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_SEARCH':
      return {
        ...state,
        collection: queryCollection(action.payload.toLowerCase()),
        search: action.payload,
      };
    case 'USER_SELECT':
      return {
        ...state,
        selected: action.payload,
      };
    case 'USER_SELECT_BY_ID':
      return {
        ...state,
        selected: findUserById(state.collection, action.payload),
      };
    case 'USER_COLLECTION_LOADED':
      initialState.collection = action.payload;
      return {
        ...state,
        collection: action.payload,
      };
    default:
      return state;
  }
};

export default user;
