const initialState = {
  collection: [],
  search: '',
  selected: {},
};

const queryCollection = (query) => {
  return initialState
    .collection
    .filter(item => item.name.toLowerCase()
      .match(query));
};

const room = (state = initialState, action) => {
  if (action.type === 'GROUP_SELECT') {
    return {
      ...state,
      selected: action.payload,
    };
  }
  if (action.type === 'GROUP_SEARCH') {
    return {
      ...state,
      collection: queryCollection(action.payload.toLowerCase()),
      search: action.payload,
    };
  }
  if (action.type === 'GROUP_COLLECTION_LOAD_SUCCESS') {
    initialState.collection = action.payload.collection;

    return {
      ...state,
      collection: action.payload.collection,
      selected: action.payload.selected,
    };
  }

  return state;
};

export default room;
