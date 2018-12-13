import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Avatar from '@material-ui/core/Avatar';

const styles = ({
  bigAvatar: {
    margin: 5,
    width: 60,
    height: 60,
  },
});

class User extends React.Component {
  render() {
    const { user, classes } = this.props;
    return (
      <ListItem button>
        <Avatar
          src="/static/images/avatar/1.jpg"
          className={classes.bigAvatar}
        />
        {user.name}
      </ListItem>
    );
  }
}

User.defaultProps = {
  user: {
    name: '',
  },
};

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  classes: PropTypes.func.isRequired,
};

export default withStyles(styles)(User);

