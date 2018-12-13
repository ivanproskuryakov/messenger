import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Users from '../components/Users';
import Conversation from '../components/Conversation';

class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div id="layout">
            <Users />
            <Conversation />s
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default Root;

