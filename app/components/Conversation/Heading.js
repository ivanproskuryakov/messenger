import React from 'react';
import Avatar from '@material-ui/core/Avatar/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  avatar: {
    margin: 0,
    width: 40,
    height: 40,
  },
});

class Heading extends React.Component {
  render() {
    const { id, classes } = this.props;
    return (
      <div className="heading">
        <Avatar
          src=""
          className={`user ${classes.avatar}`}
        />
        <div className="name">
          {id}
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
