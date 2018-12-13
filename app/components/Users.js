import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import User from './User';

const styles = ({
  root: {
    padding: 0,
    margin: 0,
  },
});

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    fetch('/api/conversation.json')
      .then(response => response.json())
      .then(data => this.setState({ users: data }));
  };

  render() {
    const { classes } = this.props;
    const { users } = this.state;

    return (
      <aside id="users">
        <List component="nav" className={classes.root}>
          {users.map(user => (
            <User user={user} key={user.name} />
          ))}
        </List>
      </aside>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.func.isRequired,
};

export default withStyles(styles)(Users);
