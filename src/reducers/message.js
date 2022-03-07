const initialState = {
  collection: [],
  text: '',
  search: '',
};

const message = (state = initialState, action) => {
  // Messages
  if (action.type === 'MESSAGE_SEND') {
    return {
      ...state,
      collection: action.payload,
      text: '',
    };
  }
  if (action.type === 'MESSAGE_TEXT_FLUSH') {
    return {
      ...state,
      text: '',
    };
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
      collection: action.payload.messages,
    };
  }

  return state;
};

export default message;
