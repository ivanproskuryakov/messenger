import { formatMessages, buildMessage } from '../service/message';

const initialState = {
  users: [],
  search: '',
  text: '',
};

const message = (state = initialState, action) => {
  if (action.type === 'MESSAGE_SEND') {
    if (state.text) {
      const { userId } = action.payload;
      state.users[userId].messages.push(buildMessage(state.text));
      state.users[userId].messages = formatMessages(state.users[userId].messages);

      return {
        ...state,
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
  if (action.type === 'MESSAGE_COLLECTION_LOADED') {
    return {
      ...state,
      messages: action.payload,
    };
  }

  return state;
};

export default message;
