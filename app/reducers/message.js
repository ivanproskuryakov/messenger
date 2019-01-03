import moment from 'moment';

const initialState = {
  collection: [],
  search: '',
  text: '',
};

const buildMessage = (text) => {
  return {
    id: moment()
      .unix(),
    text,
    timestamp: moment()
      .unix(),
    user: {
      id: 2, // current user id
    },
  };
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_SEND':
      state.collection.push(buildMessage(state.text));
      return {
        ...state,
        text: '',
      };
    case 'MESSAGE_EDIT':
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
