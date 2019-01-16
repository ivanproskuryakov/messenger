import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { withStyles } from '@material-ui/core';

import Tune from '@material-ui/icons/Tune';
import Help from '@material-ui/icons/Help';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVert from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton/IconButton';

import config from '../../config';

const styles = ({
  icon: {
    margin: 0,
  },
  button: {
    padding: 5,
    margin: 0,
  },
  avatar: {
    margin: 0,
    width: 35,
    height: 35,
  },
});

class Me extends React.Component {
  state = {
    anchorEl: null,
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  showMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  editSettings = () => {
    location.href = config.URL_SETTINGS;
  };

  logout = () => {
    location.href = config.URL_LOGOUT;
  };

  viewHelp = () => {
    location.href = config.URL_HELP;
  };

  render() {
    const { me, classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div id="myProfile">
        <Avatar
          src={me.photo}
          className={`avatar ${classes.avatar}`}
        />
        <div className="name">
          {me.name}
        </div>
        <IconButton
          className={`info ${classes.button}`}
          component="span"
          aria-label="Delete"
          aria-owns={anchorEl ? 'profileMenu' : undefined}
          aria-haspopup="true"
          onClick={this.showMenu}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="profileMenu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.viewHelp}>
            <ListItemIcon className={classes.icon}>
              <Help />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Help" />
          </MenuItem>
          <MenuItem onClick={this.editSettings}>
            <ListItemIcon className={classes.icon}>
              <Tune />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Settings" />
          </MenuItem>
          <MenuItem onClick={this.logout}>
            <ListItemIcon className={classes.icon}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Sign Out" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

Me.propTypes = {
  me: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    me: state.user.me,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Me));
