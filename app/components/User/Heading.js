import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';

const styles = ({
});

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

Heading.propTypes = {
};

export default withStyles(styles)(Heading);
