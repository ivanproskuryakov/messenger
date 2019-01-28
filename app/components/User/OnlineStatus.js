import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  default: {
    background: '#00d235',
    width: 10,
    height: 10,
    borderRadius: '50%',
    position: 'absolute',
    right: 5,
    bottom: 3,
  },
  small: {
    background: '#00d235',
    width: 8,
    height: 8,
    borderRadius: '50%',
    position: 'absolute',
    right: 1,
    bottom: 1,
  },
});

class OnlineStatus extends React.Component {
  render() {
    const { user, classes, small } = this.props;

    if (user.online) {
      if (small) {
        return (
          <div className={classes.small} />
        );
      }

      return (
        <div className={classes.default} />
      );
    }
    return '';
  }
}

OnlineStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  small: PropTypes.bool,
};
OnlineStatus.defaultProps = {
  small: false,
};

export default withStyles(styles)(OnlineStatus);

