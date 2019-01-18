import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { calendarStringsUsers } from '../../helper/time';

const styles = ({
  avatar: {
    margin: 0,
    width: 60,
    height: 60,
  },
});

const Group = ({ group, classes }) => {
  return (
    <ListItem button className="user" component={Link} to={`/group/${group.id}`}>
      <Avatar
        src={group.photo}
        className={`avatar ${classes.avatar}`}
      />
      <Moment calendar={calendarStringsUsers} date={group.lastMessage.timestamp} />
      <div className="details">
        <p className="name">{group.name}</p>
        <p className="lastMessage">{group.lastMessage.text}</p>
      </div>
    </ListItem>
  );
};

Group.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    photo: PropTypes.string,
    lastMessage: PropTypes.object,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Group);

