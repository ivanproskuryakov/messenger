const initialState = {
  collection: [],
};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_SEARCH':
      return state;
    case 'MESSAGE_ADD':
      return state;
    case 'MESSAGE_LOAD':
      return state;
    default:
      return state;
  }
};

export default messages;
