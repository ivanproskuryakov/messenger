const initialState = {
  collection: [],
  messages: [],
  text: '',
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
    return {
      ...state,
      collection: action.payload.collection,
      selected: action.payload.selected,
    };
  }

  // Messages
  if (action.type === 'MESSAGE_SEND') {
    if (state.text) {
      return {
        ...state,
        messages: action.payload,
        text: '',
      };
    }
  }
  if (action.type === 'MESSAGE_EDIT') {
    return {
      ...state,
      text: action.payload.text,
    };
  }
  if (action.type === 'MESSAGE_COLLECTION_LOAD_SUCCESS') {
    return {
      ...state,
      messages: action.payload.messages,
    };
  }

  return state;
};

export default user;
