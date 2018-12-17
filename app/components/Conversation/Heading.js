import React from 'react';
import Avatar from '@material-ui/core/Avatar/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = ({
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
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { id, classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className="heading">
        <Avatar
          src="/user/10.jpg"
          className={`user ${classes.avatar}`}
        />
        <div className="name">
          Diogenes of Sinope, {id}
        </div>
        <div id="textSearch" className="search __dark">
          <Search className="searchIcon" />
          <input className="searchInput" type="text" placeholder="Search in messages" />
        </div>
        <IconButton
          id="buttonMenu"
          className={classes.button}
          aria-label="Delete"
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Heading);
