import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Scroll from 'react-scroll';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';

import Write from './Write';
import Message from './Message';
import MessageMy from './MessageMy';
import Heading from './Heading';
import { fetchMessages } from '../../service/message';

class Messages extends React.Component {
  componentDidMount() {
    fetchMessages();
    setTimeout(() => {
      Scroll.animateScroll.scrollTo('scroll-to-element', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }, 1000);
  }

  render() {
    const { collection, selectedUser } = this.props;
    if (!selectedUser.id) {
      return (
        <section id="talk">
          <ChatBubbleOutline className="noUserSelected" />
        </section>
      );
    }

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
          <Scroll.Element name="scroll-to-element" className="element">
          </Scroll.Element>
        </div>
        <Write />
      </section>
    );
  }
}

Messages.propTypes = {
  collection: PropTypes.array.isRequired,
  selectedUser: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    collection: state.message.collection,
    selectedUser: state.user.selected,
    text: state.message.text,
  };
}

export default connect(mapStateToProps)(Messages);
