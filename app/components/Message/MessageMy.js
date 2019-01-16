import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { calendarStringsMessage } from '../../service/time';

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
      </div>
    </div>
  );
};

MessageMy.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageMy;
