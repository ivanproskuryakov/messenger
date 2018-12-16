import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Moment from 'react-moment';
import calendarStrings from '../../helper/App';

const styles = ({
  avatar: {
    margin: 0,
    width: 35,
    height: 35,
  },
});

class Message extends React.Component {
  render() {
    const { message, classes } = this.props;
    if (message.isFirst) {
      return (
        <div className={`message ${message.classes}`}>
          <Avatar
            src="https://picsum.photos/200/200/?image=1001"
            className={`user ${classes.avatar}`}
          />
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
      <div className={`message __noAvatar ${message.classes}`}>
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Message);
