import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const styles = ({
  avatar: {
    margin: 0,
    width: 60,
    height: 60,
  },
});

class User extends React.Component {
  render() {
    const { user, classes } = this.props;
    return (
      <ListItem button className="user" component={Link} to={`/messages/${user.id}`}>
        <Avatar
          src={user.photo}
          className={classes.avatar}
        />
        <span className="name">{user.name}</span>
      </ListItem>
    );
  }
}

User.defaultProps = {
  user: {
    id: 0,
    name: '',
    photo: '',
  },
};

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    photo: PropTypes.string,
  }),
  classes: PropTypes.func.isRequired,
};

export default withStyles(styles)(User);

