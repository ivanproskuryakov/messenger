import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';

// import Message from './Message';
// import MessageMy from './MessageMy';
import Write from './Write';
import Heading from './Heading';
import { fetchMessages } from '../../service/message';
import { messageCollectionLoaded } from '../../actions/message';
import store from '../../store';

class Messages extends React.Component {
  componentDidMount() {
  }

  componentDidUpdate() {
    const { selectedUser } = this.props;

    document
      .getElementById('messagesFooter')
      .scrollIntoView(false);

    if (selectedUser.id) {
      fetchMessages(selectedUser)
        .then(messages => store.dispatch(
          messageCollectionLoaded(selectedUser, messages),
        ));
    }
  }

  render() {
    const { selectedUser, messages } = this.props;

    if (selectedUser.id) {
      console.log(messages[selectedUser.id]);
      return (
        <section id="talk">
          <Heading />
          <div id="messages">
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
  selectedUser: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    messages: state.message.messages,
    selectedUser: state.user.selected,
    text: state.message.text,
  };
}

export default connect(mapStateToProps)(Messages);
