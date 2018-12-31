import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';

import User from './User';
import Heading from './Heading';
import * as userActions from '../../actions/user';

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
  state = {
    selectedIndex: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    // this.fetchUsers();
  }

  fetchUsers = () => {
    fetch('/api/users.json')
      .then(response => response.json())
      .then(data => this.setState({ users: data }));
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes } = this.props;
    const { users, selectedIndex } = this.state;
    return (
      <aside id="users">
        <Heading />
        <div className="items">
          <List component="nav" className={classes.List}>
            {users.map(user => (
              <ListItem
                key={user.name}
                button
                onClick={event => this.handleListItemClick(event, user.id)}
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
};

function mapStateToProps(state) {
  return {
    user: state.users,
  };
}

export default withStyles(styles)(Users);
