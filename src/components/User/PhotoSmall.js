import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';

import OnlineStatus from './OnlineStatus';
import route from '../../config/route';

const styles = ({
  profilePhoto: {
    position: 'relative',
  },
  avatar: {
    margin: 0,
    width: 35,
    height: 35,
  },
});

class PhotoSmall extends React.Component {
  viewProfile = () => {
    const { user } = this.props;

    window.open(
      `${route.URL_PROFILE}/${user.id}`,
      '_blank',
    );
  };

  render() {
    const { user, classes } = this.props;

    return (
      <div className={classes.profilePhoto}>
        <Avatar
          src={user.photo}
          onClick={this.viewProfile}
          className={`user ${classes.avatar}`}
        />
        <OnlineStatus user={user} small />
      </div>
    );
  }
}

PhotoSmall.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default makeStyles(styles)(PhotoSmall);

