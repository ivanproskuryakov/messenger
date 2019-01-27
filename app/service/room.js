import axios from 'axios';

import store from '../store';
import { messageTextFlushAction } from '../actions/message';
import { loadMessages } from './message/loader';
import config from '../config';
import httpOptions from '../helper/http';
import {
  roomCollectionLoadSuccessAction,
  roomSelectAction,
  roomOnlineUpdateAction,
} from '../actions/room';

const buildRooms = (collection) => {
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
      config.URL_ROOM,
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

export const updateOnlineStatuses = (members) => {
  const rooms = store.getState().room.collection;
  const updated = [];

  rooms.forEach((room) => {
    if (members.members[room.users[0].id]) {
      room.users[0].online = true;
    }

    updated.push(room);
  });

  store.dispatch(roomOnlineUpdateAction(updated));
};

export const updateOnlineStatusesMemberAdded = (member) => {
  const rooms = store.getState().room.collection;
  const updated = [];

  rooms.forEach((room) => {
    if (room.users[0].id === Number(member.id)) {
      room.users[0].online = true;
      console.log(`----> ${room.users[0].name} is Online`);
    }

    updated.push(room);
  });

  // Dispatch event
  store.dispatch(roomOnlineUpdateAction(updated));
};

export const updateOnlineStatusesMemberRemoved = (member) => {
  const rooms = store.getState().room.collection;
  const updated = [];

  rooms.forEach((room) => {
    if (room.users[0].id === Number(member.id)) {
      room.users[0].online = false;
      console.log(`----> ${room.users[0].name} is Offline`);
    }

    updated.push(room);
  });

  // Dispatch event
  store.dispatch(roomOnlineUpdateAction(updated));
};
