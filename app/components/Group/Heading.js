import React from 'react';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { groupSearchAction } from '../../actions/group';
import store from '../../store';

class Heading extends React.Component {
  onChangeSearch = (event) => {
    store.dispatch(groupSearchAction(event.target.value));
  };

  clearSearch = () => {
    store.dispatch(groupSearchAction(''));
  };

  onKeyUp = (event) => {
    if (event.key === 'Escape') {
      this.clearSearch();
    }
  };

  render() {
    const { search } = this.props;

    return (
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
    );
  }
}

Heading.propTypes = {
  search: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    search: state.group.search,
  };
}

export default connect(mapStateToProps)(Heading);
