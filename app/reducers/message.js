const initialState = {
  collection: [],
  search: '',
  text: '',
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_ADD':
      return state;
    case 'MESSAGE_COLLECTION_LOADED':
      initialState.collection = action.payload;
      return {
        ...state,
        collection: action.payload,
      };
    default:
      return state;
  }
};

export default message;
