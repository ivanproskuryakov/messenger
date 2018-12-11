import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

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
    const { name } = this.props;
    const { users } = this.state;
    return (
      <aside id="users">
        {name}
        <br />
        {users.map(user => (
          <User name={user.name} />
        ))}
      </aside>
    );
  }
}

Users.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Users;

