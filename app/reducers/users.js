const initialState = {
  collection: [
    {
      id: 1,
      name: 'Aristotle',
      photo: '/user/1.jpg',
      lastMessage: 'a long established fact that a reader',
    },
    {
      id: 2,
      name: 'Immanuel Kant',
      photo: '/user/2.jpg',
      lastMessage: 'a long established fact that a reader',
    },
  ],
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_SEARCH':
      return state;
    case 'USER_SELECT':
      console.log(action);
      return state;
    default:
      return state;
  }
};

export default users;
