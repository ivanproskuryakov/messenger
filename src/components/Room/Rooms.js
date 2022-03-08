import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { connect } from 'react-redux';
import PeopleOutline from '@mui/icons-material/PeopleOutline';

import Room from 'components/Room/Room';
import { selectRoom, loadRooms } from 'service/room';
import { loadMessages } from 'service/message/loader';

const styles = ({
  List: {
    padding: 0,
    margin: 0,
  },
  ListItem: {
    padding: 0,
    margin: 0,
  },
});

class Rooms extends React.Component {
  componentDidMount() {
    loadRooms();
  }

  onRoomClick = (event, room) => {
    selectRoom(room);
    loadMessages(room.id);
  };

  render() {
    const {
      classes,
      collection,
      selected,
    } = this.props;

    if (collection.length === 0) {
      return (
        <aside id="rooms">
          <PeopleOutline className="noResults" />
        </aside>
      );
    }

    return (
      <aside id="rooms">
        <div className="items">
          <List component="nav" className={classes.List}>
            {collection.map((room) => (
              <ListItem
                key={room.name}
                button
                onClick={(event) => this.onRoomClick(event, room)}
                className={`userItem ${selected.id === room.id ? '__active' : ''} ${classes.ListItem}`}
              >
                <Room
                  room={room}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </aside>
    );
  }
}

Rooms.propTypes = {
  classes: PropTypes.object.isRequired,
  collection: PropTypes.array.isRequired,
  selected: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
Rooms.defaultProps = {
  match: {},
  selected: {
    id: null,
  },
};

function mapStateToProps(state) {
  return {
    collection: state.room.collection,
    selected: state.room.selected,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Rooms));
