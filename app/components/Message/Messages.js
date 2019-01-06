import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';

import Message from './Message';
import MessageMy from './MessageMy';
import Write from './Write';
import Heading from './Heading';
import store from '../../store';
import { messageCollectionLoad } from '../../actions/message';

class Messages extends React.Component {
  componentDidUpdate() {
    const { selected } = this.props;

    store.dispatch(messageCollectionLoad(selected.id));
  }

  render() {
    const { selected, messages } = this.props;

    if (selected.id === 0) {
      return (
        <section id="talk">
          <Heading />
          <div id="messages">
            {messages[selected.id].map((message) => {
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
