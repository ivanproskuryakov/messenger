import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';

import Write from './Write';
import Message from './Message';
import MessageMy from './MessageMy';
import Heading from './Heading';
import { fetchMessages } from '../../service/message';
import { messageCollectionLoaded } from '../../actions/message';
import store from '../../store';

class Messages extends React.Component {
  componentDidMount() {
    fetchMessages()
      .then(data => store.dispatch(messageCollectionLoaded(data)));
  }

  componentDidUpdate() {
    const { selectedUser } = this.props;

    if (selectedUser.id) {
      document
        .getElementById('messagesFooter')
        .scrollIntoView(false);
    }
  }

  render() {
    const { collection, selectedUser } = this.props;

    if (!selectedUser.id) {
      return (
        <section id="talk">
          <ChatBubbleOutline className="noUserSelected" />
        </section>
      );
    }

    return (
      <section id="talk">
        <Heading />
        <div id="messages">
          {collection.map((message) => {
            if (message.user.id === 2) {
              return <MessageMy message={message} key={message.id} />;
            }
            return <Message message={message} key={message.id} />;
          })}
          <div id="messagesFooter" />
        </div>
        <Write />
      </section>
    );
  }
}

Messages.propTypes = {
  collection: PropTypes.array.isRequired,
  selectedUser: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    collection: state.message.collection,
    selectedUser: state.user.selected,
    text: state.message.text,
  };
}

export default connect(mapStateToProps)(Messages);
