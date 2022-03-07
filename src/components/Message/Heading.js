import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';

import Tune from '@material-ui/icons/Tune';
import Help from '@material-ui/icons/Help';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVert from '@material-ui/icons/MoreVert';
import Phone from '@material-ui/icons/Phone';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton/IconButton';

import { calendarStringsHeader } from '../../helper/time';
import route from '../../config/route';
import PhotoSmall from '../User/PhotoSmall';

const styles = ({
  icon: {
    margin: 0,
  },
  button: {
    margin: 0,
    padding: 5,
  },
  avatar: {
    margin: 0,
    width: 35,
    height: 35,
  },
});

class Heading extends React.Component {
  state = {
    search: '',
    anchorEl: null,
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  showMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  editSettings = () => {
    location.href = route.URL_SETTINGS;
  };

  logout = () => {
    location.href = route.URL_LOGOUT;
  };

  viewMyProfile = () => {
    const { me } = this.props;

    window.open(
      `${route.URL_PROFILE}/${me.id}`,
      '_blank',
    );
  };

  viewHelp = () => {
    location.href = route.URL_HELP;
  };

  clearSearch = () => {
    this.setState({ search: '' });
  };

  onKeyUp = (event) => {
    if (event.key === 'Escape') {
      this.clearSearch();
    }
  };

  changeSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { selected, classes } = this.props;
    const { search, anchorEl } = this.state;

    if (!selected.name) {
      return '';
    }

    return (
      <div className="heading">
        <PhotoSmall user={selected.users[0]} />

        <div className="name">
          {selected.name}
          <p className="activeAt">
            <Moment
              calendar={calendarStringsHeader}
              date={selected.lastMessage.timestamp}
            />
          </p>
        </div>

        <IconButton
          id="phone"
          className={classes.button}
        >
          <Phone />
        </IconButton>

        <div id="textSearch" className="search __dark">
          <Search className="searchIcon" />
          <input
            className="searchInput"
            type="text"
            value={search}
            onKeyUp={this.onKeyUp}
            onChange={this.changeSearch}
            placeholder="Search in messages"
          />
          {search.length > 0 ? (
            <Close
              className="clearIcon"
              onClick={this.clearSearch}
            />
          ) : ('')}
        </div>

        <IconButton
          id="profileInfo"
          className={classes.button}
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
          <MenuItem onClick={this.viewMyProfile}>
            <ListItemIcon className={classes.icon}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Profile" />
          </MenuItem>
          <MenuItem onClick={this.editSettings}>
            <ListItemIcon className={classes.icon}>
              <Tune />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Settings" />
          </MenuItem>
          <MenuItem onClick={this.viewHelp}>
            <ListItemIcon className={classes.icon}>
              <Help />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Help" />
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

Heading.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object,
  me: PropTypes.object.isRequired,
};
Heading.defaultProps = {
  selected: {
    id: null,
  },
};

function mapStateToProps(state) {
  return {
    collection: state.room.collection,
    selected: state.room.selected,
    me: state.user.me,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Heading));

