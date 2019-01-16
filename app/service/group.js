const buildGroups = (collection) => {
  const items = [];

  collection.forEach((group) => {
    group.photo = group.users[0].photo;
    group.name = group.users[0].name;

    items.push(group);
  });

  return items.sort((a, b) => {
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });
};

export default buildGroups;
