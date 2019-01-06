const initialState = {
  collection: [],
  selected: {
    id: null,
  },
  search: '',
};

const sortUsersByLastMessageTimestamp = (collection) => {
  return collection.sort((a, b) => {
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });
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

  if (action.type === 'USER_COLLECTION_LOAD') {
    fetch('/api/users.json')
      .then(response => response.json())
      .then(users => sortUsersByLastMessageTimestamp(users))
      .then((users) => {
        state.collection = users;
        state.selected = findUserById(action.payload);
      });
  }

  return state;
};

export default user;
