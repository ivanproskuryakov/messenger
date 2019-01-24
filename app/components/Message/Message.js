import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import DoneAll from '@material-ui/icons/DoneAll';

import { calendarStringsMessage } from '../../helper/time';
import readMessage from '../../service/message/message';

const styles = ({
  icon: {
    fontSize: 14,
    margin: 0,
  },
  avatar: {
    margin: 0,
    width: 35,
    height: 35,
  },
});

class Message extends React.Component {
  componentDidMount() {
    const { message } = this.props;

    readMessage(message);
  }

  render() {
    const { message, classes, selected } = this.props;

    if (message.isFirst) {
      return (
        <div className={`message ${message.classes}`}>
          <Avatar
            src={selected.photo}
            className={`user ${classes.avatar}`}
          />

          <div className="details">
            <div className="text">
              {message.text}
            </div>
            <div className="status">
              <Moment calendar={calendarStringsMessage} date={message.timestamp} />

              {message.isReadByAll ? (
                <div className="checkMark">
                  <DoneAll className={classes.icon} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`message __noAvatar ${message.classes}`}>
        <div className="details">
          <div className="text">
            {message.text}
          </div>
          <div className="status">
            <Moment calendar={calendarStringsMessage} date={message.timestamp} />

            {message.isReadByAll ? (
              <div className="checkMark">
                <DoneAll className={classes.icon} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    selected: state.room.selected,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Message));

