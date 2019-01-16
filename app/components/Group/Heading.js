import React from 'react';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { userSearchAction } from '../../actions/group';
import store from '../../store';

class Heading extends React.Component {
  onChangeSearch = (event) => {
    store.dispatch(userSearchAction(event.target.value));
  };

  onClearClick = () => {
    store.dispatch(userSearchAction(''));
  };

  render() {
    const { search } = this.props;

    return (
      <div className="heading">
        <div className="search">
          <Search className="searchIcon" />
          <input
            className="searchInput"
            type="text"
            value={search}
            onChange={this.onChangeSearch}
            placeholder="Search by name"
          />
          {search.length > 0 ? (
            <Close
              className="clearIcon"
              onClick={this.onClearClick}
            />
          ) : ('') }
        </div>
      </div>
    );
  }
}

Heading.propTypes = {
  search: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    search: state.user.search,
  };
}

export default connect(mapStateToProps)(Heading);
