import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import DoneAll from '@material-ui/icons/DoneAll';
import Done from '@material-ui/icons/Done';

import { calendarStringsUsers } from '../../helper/time';

const styles = ({
  icon: {
    fontSize: 14,
    margin: 0,
  },
  avatar: {
    margin: 0,
    width: 60,
    height: 60,
  },
});

class Room extends React.Component {
  render() {
    const { room, classes } = this.props;

    return (
      <ListItem button className="user" component={Link} to={`/room/${room.id}`}>
        <Avatar
          src={room.photo}
          className={`avatar ${classes.avatar}`}
        />
        <div className="status">
          <div className="checkMark">
            {room.lastMessage.isReadByAll === 1 ? (
              <DoneAll className={classes.icon} />
            ) : (
              <Done className={classes.icon} />
            )}
          </div>

          <Moment calendar={calendarStringsUsers} date={room.lastMessage.timestamp} />
        </div>
        <div className="details">
          <p className="name">{room.name}</p>
          <p className="lastMessage">{room.lastMessage.text}</p>
        </div>
      </ListItem>
    );
  }
}

Room.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    photo: PropTypes.string,
    lastMessage: PropTypes.object,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);

