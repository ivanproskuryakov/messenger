import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
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
    const date = new Date();
    const { user, classes } = this.props;
    const calendarStrings = {
      lastDay: '[Yesterday at] LT',
      sameDay: 'LT',
      lastWeek: '[last] dddd [at] LT',
      nextWeek: 'dddd [at] LT',
      sameElse: 'L',
    };
    return (
      <ListItem button className="user" component={Link} to={`/messages/${user.id}`}>
        <Avatar
          src={user.photo}
          className={`avatar ${classes.avatar}`}
        />
        <Moment calendar={calendarStrings} date={date} />
        <div className="details">
          <p className="name">{user.name}</p>
          <p className="lastMessage">{user.lastMessage}</p>
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
    lastMessage: PropTypes.string,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);

