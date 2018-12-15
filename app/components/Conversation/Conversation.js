import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Write from './Write';
import Message from './Message';
import MessageMy from './MessageMy';
import Heading from './Heading';

const styles = ({
});

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  formatMessages = (messages) => {
    const myUserId = 2;
    const formatted = [];

    for (let i = 0; i < messages.length; i += 1) {
      const m = messages[i];
      m.classes = '';
      m.isFirst = false;
      m.isLast = false;
      m.my = myUserId === messages[i].user.id;

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

  fetchUsers = () => {
    fetch('/api/messages.json')
      .then(response => response.json())
      .then(data => this.formatMessages(data))
      .then(data => this.setState({ messages: data }));
  };

  render() {
    const { match } = this.props;
    const { messages } = this.state;

    return (
      <section id="conversation">
        <Heading id={match.params.id} />
        <div id="messages">
          {messages.map((message) => {
            if (message.user.id === 2) {
              return <MessageMy message={message} key={message.id} />;
            }
            return <Message message={message} key={message.id} />;
          })}
        </div>
        <Write />
      </section>
    );
  }
}

Conversation.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withStyles(styles)(Conversation);
