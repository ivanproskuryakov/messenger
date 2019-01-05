import { formatMessages, buildMessage } from '../service/message';

const initialState = {
  messages: [],
  search: '',
  text: '',
};

const message = (state = initialState, action) => {
  if (action.type === 'MESSAGE_SEND') {
    const { userId } = action.payload;

    if (state.text) {
      state.messages[userId].messages.push(buildMessage(state.text));
      state.messages[userId].messages = formatMessages(state.messages[userId].messages);

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
    const { userId, messages } = action.payload;

    console.log(action);
    state.messages[userId] = {
      messages: formatMessages(messages),
    };
  }

  return state;
};

export default message;
