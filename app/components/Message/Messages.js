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
    const { collection } = this.props;

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
        </div>
        <Write />
      </section>
    );
  }
}

Messages.propTypes = {
  collection: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    collection: state.message.collection,
    text: state.message.text,
  };
}

export default connect(mapStateToProps)(Messages);
