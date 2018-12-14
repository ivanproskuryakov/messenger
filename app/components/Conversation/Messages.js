import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Write from './Write';
import Message from './Message';

const styles = ({
});

class Messages extends React.Component {
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
    return (
      <section id="conversation">
        <div className="heading">
          <div className="name">
            {match.params.id}
          </div>
        </div>
        <div id="messages">
          {messages.map(message => (
            <Message message={message} key={message.date} />
          ))}
        </div>
        <Write />
      </section>
    );
  }
}

Messages.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withStyles(styles)(Messages);
