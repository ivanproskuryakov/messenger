import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import MoonLoader from 'react-spinners/BarLoader';

import Messages from './Message/Messages';
import authorizeUser from '../actions/user';
import Sidenav from './Sidenav';

class App extends React.Component {
  componentDidMount() {
    authorizeUser();
  }

  render() {
    const { me } = this.props;
    const isLoading = me.id === undefined;

    return (
      <>
        <CssBaseline />
        <Router>
          <div id="layout">
            {isLoading ? (
              <div id="loading">
                <div id="spinner">
                  <MoonLoader
                    sizeUnit="px"
                    size={50}
                    height={3}
                    color="#2d7cc1"
                    loading={isLoading}
                  />
                </div>
              </div>
            ) : ('')}

            <Route component={Sidenav} />
            <Route component={Messages} />

          </div>
        </Router>
      </>
    );
  }
}

App.propTypes = {
  me: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    me: state.user.me,
  };
}

export default connect(mapStateToProps)(App);

