import React from 'react';
import Search from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { userSearch } from '../../actions/user';
import store from '../../store';

class Heading extends React.Component {
  onChangeSearch = (event) => {
    store.dispatch(userSearch(event.target.value));
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
    search: state.users.search,
  };
}

export default connect(mapStateToProps)(Heading);
