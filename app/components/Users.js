import React from 'react';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <aside id="users">
        <div className="content">
          users
        </div>
      </aside>
    );
  }
}

export default Users;
