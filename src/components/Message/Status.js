import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/material';
import DoneAll from '@mui/icons-material/DoneAll';
import Done from '@mui/icons-material/Done';

const styles = ({
  icon: {
    fontSize: 14,
    margin: 0,
  },
});

class MessageStatus extends React.Component {
  render() {
    const { message, classes } = this.props;

    if (message.isReadByAll) {
      return (
        <div className="checkMark">
          <DoneAll className={classes.icon} />
        </div>
      );
    }

    if (message.mocked) {
      return '';
    }

    return (
      <div className="checkMark">
        <Done className={classes.icon} />
      </div>
    );
  }
}

MessageStatus.propTypes = {
  message: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageStatus);
