import React from 'react';
import Search from '@material-ui/icons/Search';

class Heading extends React.Component {
  state = {
    search: '',
  };

  changeSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { search } = this.state;

    return (
      <div className="heading">
        <div className="search">
          <Search className="searchIcon" />
          <input
            className="searchInput"
            type="text"
            value={search}
            onChange={this.changeSearch}
            placeholder="Search by name"
          />
        </div>
      </div>
    );
  }
}

export default Heading;
