import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import User from './User';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
    const { name, classes } = this.props;
    const { users } = this.state;
    return (
      <aside id="users">
        <div className="content">
          <TextField
            id="outlined-name"
            label={name}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          {users.map(user => (
            <User name={user.name} />
          ))}
        </div>
      </aside>
    );
  }
}

Users.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.func.isRequired,
};

export default withStyles(styles)(Users);
