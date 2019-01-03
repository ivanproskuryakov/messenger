import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Write from './Write';
import Message from './Message';
import MessageMy from './MessageMy';
import Heading from './Heading';
import { fetchMessages } from '../../service/message';

class Messages extends React.Component {
  componentDidMount() {
    fetchMessages();
  }

  render() {
    const { match, collection } = this.props;

    return (
      <section id="messages">
        <Heading id={match.params.id} />
        {collection.map((message) => {
          if (message.user.id === 2) {
            return <MessageMy message={message} key={message.id} />;
          }
          return <Message message={message} key={message.id} />;
        })}
        <Write />
      </section>
    );
  }
}

Messages.propTypes = {
  collection: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    collection: state.message.collection,
    text: state.message.text,
  };
}

export default connect(mapStateToProps)(Messages);
