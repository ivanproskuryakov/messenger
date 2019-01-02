import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Users from '../components/User/Users';
import Messages from '../components/Message/Messages';

class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div id="layout">
            <Users />
            <Route exact path="/messages/:id" component={Messages} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default Root;

