import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import OnlineStatus from './OnlineStatus';

const styles = ({
  profilePhoto: {
    position: 'relative',
  },
  icon: {
    fontSize: 14,
    margin: 0,
  },
  avatar: {
    margin: 0,
    width: 60,
    height: 60,
  },
});

class Photo extends React.Component {
  render() {
    const { user, classes } = this.props;

    return (
      <div className={classes.profilePhoto}>
        <Avatar
          src={user.photo}
          className={`avatar ${classes.avatar}`}
        />
        <OnlineStatus user={user} />
      </div>
    );
  }
}

Photo.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(Photo);

