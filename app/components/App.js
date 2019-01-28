import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import MoonLoader from 'react-spinners/BarLoader';
import { withStyles } from '@material-ui/core';

import Messages from './Message/Messages';
import authorizeUser from '../actions/user';
import Sidenav from './Sidenav';

const styles = {
  loading: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: 123,
    background: '#fff',
    textAlign: 'center',
  },
  spinner: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    marginLeft: '-50px',
    marginTop: '-25px',
  },
};

class App extends React.Component {
  componentDidMount() {
    authorizeUser();
  }

  render() {
    const { me, classes } = this.props;
    const isLoading = me.id === undefined;

    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div id="layout">
            {isLoading ? (
              <div id="loading" className={classes.loading}>
                <div className={classes.spinner}>
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
      </React.Fragment>
    );
  }
}

App.propTypes = {
  me: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    me: state.user.me,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(App));

