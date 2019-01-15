const getUsersFromGroups = (collection) => {
  const items = [];

  collection.forEach((group) => {
    const user = group.users[0];

    user.lastMessage = group.lastMessage;

    console.log(user.lastMessage.timestamp);

    items.push(user);
  });

  return items;
};

const sortUsersByLastMessageTimestamp = (collection) => {
  return collection.sort((a, b) => {
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });
};

const buildUsers = (data) => {
  let users;

  users = getUsersFromGroups(data);
  users = sortUsersByLastMessageTimestamp(users);

  return users;
};

export default buildUsers;
