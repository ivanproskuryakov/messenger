import React from 'react';
import Search from '@mui/icons-material/Search';
import Close from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@mui/material';

import { roomSearchAction } from '../../actions/room';
import store from '../../store';

const styles = {
  header: {
    padding: 6,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    height: 49,
  },
};

class Heading extends React.Component {
  onChangeSearch = (event) => {
    store.dispatch(roomSearchAction(event.target.value));
  };

  clearSearch = () => {
    store.dispatch(roomSearchAction(''));
  };

  onKeyUp = (event) => {
    if (event.key === 'Escape') {
      this.clearSearch();
    }
  };

  render() {
    const { search, classes } = this.props;

    return (
      <div className={classes.header}>
        <div className="search">
          <Search className="searchIcon" />
          <input
            className="searchInput"
            type="text"
            value={search}
            onChange={this.onChangeSearch}
            onKeyUp={this.onKeyUp}
            placeholder="Search by name"
          />
          {search.length > 0 ? (
            <Close
              className="clearIcon"
              onClick={this.clearSearch}
            />
          ) : ('')}
        </div>
      </div>
    );
  }
}

Heading.propTypes = {
  search: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    search: state.room.search,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Heading));
