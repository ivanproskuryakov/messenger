const initialState = {
  me: {},
  collection: [],
  search: '',
  selected: {
    id: null,
  },
};

const queryCollection = (query) => {
  return initialState
    .collection
    .filter(item => item.name.toLowerCase()
      .match(query));
};

const user = (state = initialState, action) => {
  if (action.type === 'USER_ME') {
    return {
      ...state,
      me: action.payload,
    };
  }
  if (action.type === 'USER_SELECT') {
    return {
      ...state,
      selected: action.payload,
    };
  }
  if (action.type === 'USER_SEARCH') {
    return {
      ...state,
      collection: queryCollection(action.payload.toLowerCase()),
      search: action.payload,
    };
  }
  if (action.type === 'USER_COLLECTION_LOAD_SUCCESS') {
    initialState.collection = action.payload.collection;

    return {
      ...state,
      collection: action.payload.collection,
      selected: action.payload.selected,
    };
  }

  return state;
};

export default user;
