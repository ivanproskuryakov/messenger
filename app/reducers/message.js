const initialState = {
  collection: [],
  search: '',
  text: '',
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_SEND':
      console.log(action, state.text);
      return {
        ...state,
        text: '',
      };
    case 'MESSAGE_EDIT':
      console.log(state.text);
      return {
        ...state,
        text: action.payload,
      };
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
