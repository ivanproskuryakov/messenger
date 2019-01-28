import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  online: {
    background: '#00d235',
    width: 10,
    height: 10,
    borderRadius: '50%',
    position: 'absolute',
    right: 5,
    bottom: 3,
  },
});

class OnlineStatus extends React.Component {
  render() {
    const { user, classes } = this.props;

    if (user.online) {
      return (
        <div className={classes.online} />
      );
    }

    return '';
  }
}

OnlineStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(OnlineStatus);

