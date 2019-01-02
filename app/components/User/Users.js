import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import User from './User';
import Heading from './Heading';
import store from '../../store';
import { userSelect } from '../../actions/user';
import fetchUsers from '../../service/user';

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

class Users extends React.Component {
  componentDidMount() {
    fetchUsers();
  }

  onUserClick = (event, user) => {
    store.dispatch(userSelect(user));
  };

  render() {
    const { classes, collection, selected } = this.props;
    if (collection.length === 0) {
      return (
        <aside id="users">
          <Heading />
          <PeopleOutline className="noResults" />
        </aside>
      );
    }
    return (
      <aside id="users">
        <Heading />
        <div className="items">
          <List component="nav" className={classes.List}>
            {collection.map(user => (
              <ListItem
                key={user.name}
                button
                onClick={event => this.onUserClick(event, user)}
                className={`userItem ${selected.id === user.id ? '__active' : ''} ${classes.ListItem}`}
              >
                <User
                  user={user}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </aside>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  collection: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    collection: state.user.collection,
    selected: state.user.selected,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Users));
