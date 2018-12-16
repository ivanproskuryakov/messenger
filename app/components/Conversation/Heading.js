import React from 'react';
import Avatar from '@material-ui/core/Avatar/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';

const styles = ({
  avatar: {
    margin: 0,
    width: 35,
    height: 35,
  },
});

class Heading extends React.Component {
  render() {
    const { id, classes } = this.props;
    return (
      <div className="heading">
        <Avatar
          src="/user/10.jpg"
          className={`user ${classes.avatar}`}
        />
        <div className="name">
          Diogenes of Sinope, {id}
        </div>
        <div className="search __dark">
          <Search className="searchIcon" />
          <input className="searchInput" type="text" placeholder="Search in messages" />
        </div>
      </div>
    );
  }
}

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Heading);
