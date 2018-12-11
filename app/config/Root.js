import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Users from '../components/Users';
import Conversation from '../components/Conversation';

class Root extends React.Component {
  render() {
    return (
      <Router>
        <div id="layout">
          <Users name="Users" />
          <Conversation name="Sara" />
        </div>
      </Router>
    );
  }
}

export default Root;

