import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';

import User from './User';
import Heading from './Heading';
import { userSelect } from '../../actions/user';

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

@connect(
  state => ({
    users: state.users.collection,
  }),
  dispatch => ({
    userSelectAction: user => dispatch(userSelect(user)),
  }),
)

class Users extends React.Component {
  state = {
    selectedIndex: 1,
  };

  onUserClick = (event, user) => {
    const { userSelectAction } = this.props;
    userSelectAction(user);
    // dispatch(userSelect(user));

    this.setState({ selectedIndex: user.id });
  };

  render() {
    const { classes, users } = this.props;
    const { selectedIndex } = this.state;
    return (
      <aside id="users">
        <Heading />
        <div className="items">
          <List component="nav" className={classes.List}>
            {users.map(user => (
              <ListItem
                key={user.name}
                button
                onClick={event => this.onUserClick(event, user)}
                className={`userItem ${selectedIndex === user.id ? '__active' : ''} ${classes.ListItem}`}
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
  users: PropTypes.array.isRequired,
  userSelectAction: PropTypes.func.isRequired,
};

export default withStyles(styles)(Users);
