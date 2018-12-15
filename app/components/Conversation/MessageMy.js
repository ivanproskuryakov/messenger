import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import calendarStrings from '../../helper/App';

class Message extends React.Component {
  render() {
    const { message } = this.props;
    if (message.isFirst) {
      return (
        <div className={`messageMy ${message.classes}`}>
          <div className="details">
            <div className="info">
              <Moment calendar={calendarStrings} date={message.timestamp} />
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
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
