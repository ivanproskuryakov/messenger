const authorizeSuccessAction = user => ({
  type: 'USER_AUTHORIZE_SUCCESS',
  payload: user,
});

export default authorizeSuccessAction;
