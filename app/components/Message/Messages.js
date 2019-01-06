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
    loadMessages();
  }

  render() {
    const { selected, messages } = this.props;

    if (selected.id) {
      return (
        <section id="talk">
          <Heading />
          <div id="messages">
            {messages.map((message) => {
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
  messages: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
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
    messages: state.message.messages,
    selected: state.user.selected,
    text: state.message.text,
  };
}

export default connect(mapStateToProps)(Messages);
