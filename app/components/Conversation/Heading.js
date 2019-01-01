import React from 'react';
import Avatar from '@material-ui/core/Avatar/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { calendarStringsHeader } from '../../helper/App';

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
    search: '',
  };

  showMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  changeSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { selected, classes } = this.props;
    const { anchorEl, search } = this.state;

    return (
      <div className="heading">
        <Avatar
          src={selected.photo}
          className={`user ${classes.avatar}`}
        />
        <div className="name">
          {selected.name}
          <p className="activeAt">
            <Moment calendar={calendarStringsHeader} date={selected.activeAt} />
          </p>
        </div>
        <div id="textSearch" className="search __dark">
          <Search className="searchIcon" />
          <input
            className="searchInput"
            type="text"
            value={search}
            onChange={this.changeSearch}
            placeholder="Search in messages"
          />
        </div>
        <IconButton
          id="buttonMenu"
          className={classes.button}
          aria-label="Delete"
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.showMenu}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.closeMenu}>Profile</MenuItem>
          <MenuItem onClick={this.closeMenu}>My account</MenuItem>
          <MenuItem onClick={this.closeMenu}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

Heading.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    collection: state.users.collection,
    selected: state.users.selected,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Heading));

