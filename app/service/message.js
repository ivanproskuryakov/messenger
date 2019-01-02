import store from '../store';
import { messageCollectionLoaded } from '../actions/message';

const formatMessages = (messages) => {
  const myUserId = 2;
  const formatted = [];

  for (let i = 0; i < messages.length; i += 1) {
    const m = messages[i];
    m.classes = '';
    m.isFirst = false;
    m.isLast = false;
    m.my = myUserId === messages[i].user.id;

    if (i === 0) {
      m.classes += '__initial';
      m.isFirst = true;
    }
    if (messages[i - 1]) {
      if (messages[i - 1].user.id !== m.user.id) {
        m.isFirst = true;
        m.classes += '__first';
      }
    }
    if (messages[i + 1]) {
      if (m.user.id !== messages[i + 1].user.id) {
        m.isLast = true;
        m.classes += '__last';
      }
    }
    formatted.push(m);
  }
  return formatted;
};

const fetchMessages = () => {
  fetch('/api/messages.json')
    .then(response => response.json())
    .then(data => formatMessages(data))
    .then(data => store.dispatch(messageCollectionLoaded(data)));
};

export default fetchMessages;
