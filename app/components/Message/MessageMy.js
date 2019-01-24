import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { calendarStringsMessage } from '../../helper/time';

const MessageMy = ({ message }) => {
  if (message.isFirst) {
    return (
      <div className={`messageMy ${message.classes}`}>
        <div className="details">
          <div className="info">
            <Moment calendar={calendarStringsMessage} date={message.timestamp} />
          </div>
          <div className="text">
            {message.text}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`messageMy ${message.classes}`}>
      <div className="details">
        <div className="text">
          {message.text}
        </div>
        <Moment calendar={calendarStringsMessage} date={message.readers[0].timestamp} />
      </div>
    </div>
  );
};

MessageMy.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageMy;
