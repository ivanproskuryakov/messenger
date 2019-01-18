import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
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
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div id="layout">
            {isLoading ? (
              <div id="loading">
                <MoonLoader
                  class="loading"
                  sizeUnit="px"
                  size={50}
                  height={3}
                  color="#43444f"
                  loading={isLoading}
                />
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
};

function mapStateToProps(state) {
  return {
    me: state.user.me,
  };
}

export default connect(mapStateToProps)(App);

