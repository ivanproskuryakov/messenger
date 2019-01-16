import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';

import Moment from 'react-moment';
import { connect } from 'react-redux';
import { calendarStringsHeader } from '../../service/time';
import Me from '../User/Me';

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
  };

  onClearClick = () => {
    this.setState({ search: '' });
  };

  changeSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { selected, classes } = this.props;
    const { search } = this.state;

    if (!selected.name) {
      return '';
    }
    return (
      <div className="heading">
        <Avatar
          src={selected.photo}
          className={`user ${classes.avatar}`}
        />
        <div className="name">
          {selected.name}
          <p className="activeAt">
            <Moment calendar={calendarStringsHeader} date={selected.lastMessage.timestamp} />
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
          {search.length > 0 ? (
            <Close
              className="clearIcon"
              onClick={this.onClearClick}
            />
          ) : ('') }
        </div>

        <Me />
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
    collection: state.user.collection,
    selected: state.user.selected,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Heading));

