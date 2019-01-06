const initialState = {
  collection: [],
  search: '',
  text: '',
};

const message = (state = initialState, action) => {
  if (action.type === 'MESSAGE_SEND') {
    if (state.text) {
      return {
        ...state,
        collection: action.payload,
        text: '',
      };
    }
  }
  if (action.type === 'MESSAGE_EDIT') {
    return {
      ...state,
      text: action.payload,
    };
  }
  if (action.type === 'MESSAGE_COLLECTION_LOAD_SUCCESS') {
    return {
      ...state,
      collection: action.payload.messages,
    };
  }

  return state;
};

export default message;
