const buildGroups = (collection) => {
  const items = [];

  collection.forEach((group) => {
    group.photo = group.users[0].photo;
    group.name = group.users[0].name;

    items.push(group);
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

  users = buildGroups(data);
  users = sortUsersByLastMessageTimestamp(users);

  return users;
};

export default buildUsers;
