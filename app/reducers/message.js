const initialState = {
  collection: [],
  search: '',
  text: '',
};

const message = (state = initialState, action) => {
  // if (action.type === 'MESSAGE_SEND') {
  //   const { userId } = action.payload;
  //
  //   if (state.text) {
  //     state.messages[userId].messages.push(buildMessage(state.text));
  //     state.messages[userId].messages = formatMessages(state.messages[userId].messages);
  //
  //     return {
  //       ...state,
  //       text: '',
  //     };
  //   }
  // }
  // if (action.type === 'MESSAGE_EDIT') {
  //   return {
  //     ...state,
  //     text: action.payload,
  //   };
  // }
  if (action.type === 'MESSAGE_COLLECTION_LOAD_SUCCESS') {
    console.log(state.collection, action);

    // messages[action.payload.userId] = action.payload.messages;

    return {
      ...state,
      collection: action.payload.messages,
    };
  }

  return state;
};

export default message;
