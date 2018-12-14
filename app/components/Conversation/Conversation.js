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

  fetchUsers = () => {
    fetch('/api/messages.json')
      .then(response => response.json())
      .then(data => this.setState({ messages: data }));
  };

  render() {
    const { match } = this.props;
    const { messages } = this.state;
    const myId = 2;
    return (
      <section id="conversation">
        <Heading id={match.params.id} />
        <div id="messages">
          {messages.map((message) => {
            if (message.user.id === myId) {
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
