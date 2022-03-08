import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { withStyles } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem/ListItem';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

import { calendarStringsUsers } from '../../helper/time';
import MessageStatus from '../Message/Status';
import Photo from '../User/Photo';

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
    const { room } = this.props;

    return (
      <ListItem button className="user" component={Link} to={`/room/${room.id}`}>
        <Photo user={room.users[0]} />
        <div className="status">
          <MessageStatus message={room.lastMessage} />
          <Moment calendar={calendarStringsUsers} date={room.lastMessage.timestamp} />
        </div>
        <div className="details">
          <p className="name">{room.name}</p>
          <p className="lastMessage">{room.lastMessage.text}</p>
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          autoHideDuration={1000}
          open={false}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{room.users[0].name} online</span>}
        />
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
    users: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default withStyles(styles)(Room);

