import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../components/Header';
import Users from '../components/Users';
import Conversation from '../components/Conversation';

const Root = () => {
  return (
    <Router>
      <div id="layout">
        <Header />
        <Users />
        <Conversation />
      </div>
    </Router>
  );
};

export default Root;

