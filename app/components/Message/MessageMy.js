import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { calendarStringsMessage } from '../../helper/time';
import MessageStatus from './Status';

class MessageMy extends React.Component {
  render() {
    const { message } = this.props;

    return (
      <div className={`messageMy ${message.classes}`}>
        <div className="details">
          <div className="status">
            <MessageStatus message={message} />

            <Moment calendar={calendarStringsMessage} date={message.timestamp} />
          </div>
          <div className="text">
            {message.text}
          </div>
        </div>
      </div>
    );
  }
}

MessageMy.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageMy;
