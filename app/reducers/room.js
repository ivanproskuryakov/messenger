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
  if (action.type === 'ROOM_SELECT') {
    return {
      ...state,
      selected: action.payload,
    };
  }
  if (action.type === 'ROOM_SEARCH') {
    return {
      ...state,
      collection: queryCollection(action.payload.toLowerCase()),
      search: action.payload,
    };
  }
  if (action.type === 'ROOM_COLLECTION_LOAD_SUCCESS') {
    initialState.collection = action.payload.collection;

    console.log('ROOM_COLLECTION_LOAD_SUCCESS', action.payload);

    return {
      ...state,
      collection: action.payload.collection,
      selected: action.payload.selected,
    };
  }

  return state;
};

export default room;
