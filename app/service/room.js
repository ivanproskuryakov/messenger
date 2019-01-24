import axios from 'axios';

import store from '../store';
import { messageTextFlushAction } from '../actions/message';
import { loadMessages } from './message';
import config from '../config';
import httpOptions from '../helper/http';
import { roomCollectionLoadSuccessAction, roomSelectAction } from '../actions/room';

export const buildRooms = (collection) => {
  const items = [];

  collection.forEach((room) => {
    room.photo = room.users[0].photo;
    room.name = room.users[0].name;

    items.push(room);
  });

  return items.sort((a, b) => {
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });
};

export const selectRoom = (room) => {
  store.dispatch(roomSelectAction(room));
  store.dispatch(messageTextFlushAction());
};

export const loadRooms = () => {
  axios
    .get(
      config.URL_GROUP,
      httpOptions,
    )
    .then((response) => {
      if (response.data.length === 0) {
        return;
      }

      const rooms = buildRooms(response.data);

      store.dispatch(roomSelectAction(rooms[0]));
      store.dispatch(roomCollectionLoadSuccessAction(
        rooms,
        rooms[0],
      ));
      loadMessages(rooms[0].id); // Load messages for the last selected room
    });
};
