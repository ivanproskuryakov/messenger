import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import DoneAll from '@material-ui/icons/DoneAll';
import { withStyles } from '@material-ui/core';
import { calendarStringsMessage } from '../../helper/time';
import readMessage from '../../service/message/message';

const styles = ({
  icon: {
    fontSize: 14,
    margin: 0,
  },
});

class MessageMy extends React.Component {
  componentDidMount() {
    const { message } = this.props;

    readMessage(message);
  }

  render() {
    const { message, classes } = this.props;

    return (
      <div className={`messageMy ${message.classes}`}>
        <div className="details">
          <div className="status">

            {true ? (
              <div className="checkMark">
                <DoneAll className={classes.icon} />
              </div>
            ) : null}

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
  classes: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageMy);
