import React from 'react';
import Avatar from '@material-ui/core/Avatar/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
      </div>
    );
  }
}

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Heading);
