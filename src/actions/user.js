const authorizeSuccessAction = (user) => ({
  type: 'USER_AUTHORIZE_SUCCESS',
  payload: user,
});
export const userOnlineUpdateAction = (user) => ({
  type: 'USER_ONLINE_UPDATE',
  payload: user,
});

export default authorizeSuccessAction;
