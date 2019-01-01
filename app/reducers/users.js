const initialState = {
  collection: [],
  selected: {},
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_SELECT':
      return {
        ...state,
        selected: action.payload,
      };
    case 'USER_COLLECTION_LOADED':
      return {
        ...state,
        collection: action.payload,
      };
    default:
      return state;
  }
};

export default users;
