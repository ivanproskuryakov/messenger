import { formatMessages, buildMessage } from '../service/message';

const initialState = {
  collection: [],
  search: '',
  text: '',
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_SEND':
      if (state.text) {
        state.collection.push(buildMessage(state.text));
        state.collection = formatMessages(state.collection);
        return {
          ...state,
          text: '',
        };
      }

      return state;
    case 'MESSAGE_EDIT':
      return {
        ...state,
        text: action.payload,
      };
    case 'MESSAGE_COLLECTION_LOADED':
      return {
        ...state,
        collection: action.payload,
      };
    default:
      return state;
  }
};

export default message;
