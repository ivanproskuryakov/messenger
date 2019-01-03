import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { calendarStringsMessage } from '../../helper/app';

const styles = ({
  avatar: {
    margin: 0,
    width: 35,
    height: 35,
  },
});

class Message extends React.Component {
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
  selected: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    collection: state.user.collection,
    selected: state.user.selected,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Message));

