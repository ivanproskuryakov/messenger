import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';

import Message from './Message';
import MessageMy from './MessageMy';
import Write from './Write';
import Heading from './Heading';
import { loadMessages } from '../../actions/message';

class Messages extends React.Component {
  componentDidMount() {
    loadMessages(11);
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
    const { selectedUser, collection } = this.props;

    if (selectedUser) {
      return (
        <section id="talk">
          <Heading />
          <div id="collection">
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

    return (
      <section id="talk">
        <ChatBubbleOutline className="noUserSelected" />
      </section>
    );
  }
}

Messages.propTypes = {
  collection: PropTypes.array.isRequired,
  selectedUser: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
Messages.defaultProps = {
  match: {},
};

function mapStateToProps(state) {
  return {
    collection: state.message.collection,
    selectedUser: state.user.selected,
    text: state.message.text,
  };
}

export default connect(mapStateToProps)(Messages);
