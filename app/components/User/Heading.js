import React from 'react';
import Search from '@material-ui/icons/Search';

class Heading extends React.Component {
  render() {
    return (
      <div className="heading">
        <div className="search">
          <Search className="searchIcon" />
          <input className="searchInput" type="text" placeholder="Search by name" />
        </div>
      </div>
    );
  }
}

export default Heading;
