import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { calendarStringsUsers } from '../../helper/app';

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
          className={`avatar ${classes.avatar}`}
        />
        <Moment calendar={calendarStringsUsers} date={user.lastMessage.timestamp} />
        <div className="details">
          <p className="name">{user.name}</p>
          <p className="lastMessage">{user.lastMessage.text}</p>
        </div>
      </ListItem>
    );
  }
}

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    photo: PropTypes.string,
    lastMessage: PropTypes.object,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);

