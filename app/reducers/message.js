// import moment from 'moment';

const myUserId = 2;
const initialState = {
  messages: [],
  search: '',
  text: '',
};

const formatMessages = (messages) => {
  const formatted = [];

  for (let i = 0; i < messages.length; i += 1) {
    const m = messages[i];
    const previous = messages[i - 1];
    const next = messages[i + 1];

    m.classes = '';
    m.isFirst = false;
    m.my = myUserId === messages[i].user.id;

    if (i === 0) {
      m.classes += '__initial';
      m.isFirst = true;
    }

    if (previous) {
      if (previous.user.id !== m.user.id) {
        m.isFirst = true;
        m.classes += '__first';
      }
    }
    if (previous && !next) {
      m.classes += '__last';
    }
    if (next) {
      if (next.user.id !== m.user.id) {
        m.classes += '__last';
      }
    }

    formatted.push(m);
  }

  return formatted;
};

// const buildMessage = (text) => {
//   return {
//     id: Math.random(),
//     text,
//     timestamp: moment()
//       .unix(),
//     user: {
//       id: myUserId, // current user id
//     },
//   };
// };

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
  if (action.type === 'MESSAGE_COLLECTION_LOAD') {
    fetch('/api/messages.json')
      .then(response => response.json())
      .then((data) => {
        formatMessages(data);
        state.messages[action.payload] = data;

        return state;
      });
  }

  return {
    ...state,
  };
};

export default message;
