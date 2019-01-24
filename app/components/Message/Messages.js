import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';

import Message from './Message';
import MessageMy from './MessageMy';
import Write from './Write';
import Heading from './Heading';

class Messages extends React.Component {
  componentDidUpdate() {
    const { selected } = this.props;

    if (selected.id) {
      document
        .getElementById('messagesFooter')
        .scrollIntoView(false);
    }
  }

  render() {
    const { selected, collection, me } = this.props;

    if (selected.id) {
      return (
        <section id="talk">
          <Heading />
          <div id="messages">
            {collection.map((message) => {
              if (message.user.id === me.id) {
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
  selected: PropTypes.object,
  me: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
Messages.defaultProps = {
  match: {},
  selected: {
    id: null,
  },
};

function mapStateToProps(state) {
  return {
    collection: state.message.collection,
    selected: state.room.selected,
    me: state.user.me,
    text: state.message.text,
  };
}

export default connect(mapStateToProps)(Messages);
