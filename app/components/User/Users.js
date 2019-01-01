import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';

import User from './User';
import Heading from './Heading';
import store from '../../store';
import { userSelect, userCollectionLoaded } from '../../actions/user';

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
    this.fetchUsers();
  }

  onUserClick = (event, user) => {
    store.dispatch(userSelect(user));
  };

  fetchUsers = () => {
    fetch('/api/users.json')
      .then(response => response.json())
      .then(data => store.dispatch(userCollectionLoaded(data)));
  };

  render() {
    const { classes, collection, selected } = this.props;
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
    collection: state.users.collection,
    selected: state.users.selected,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Users));
