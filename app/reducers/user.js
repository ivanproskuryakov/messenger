const initialState = {
  me: {},
};

const user = (state = initialState, action) => {
  if (action.type === 'USER_ME') {
    return {
      ...state,
      me: action.payload,
    };
  }

  return state;
};

export default user;
