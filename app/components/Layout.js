import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import MoonLoader from 'react-spinners/BarLoader';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Groups from './Group/Groups';
import Messages from './Message/Messages';
import { getAuthorizationData } from '../actions/user';

const styles = theme => ({
  tabsRoot: {
    height: 50,
    background: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
  tabsIndicator: {
    background: '#43444f',
  },
  tabSelected: {
    background: '#43444f',
  },
  tabRoot: {
    color: '#43444f',
    marginTop: 1,
    marginRight: 0,
    minWidth: 110,
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Layout extends React.Component {
  state = {
    selectedTab: 0,
  };

  componentDidMount() {
    getAuthorizationData();
  }

  handleChange = (event, selectedTab) => {
    this.setState({ selectedTab });
  };

  render() {
    const { selectedTab } = this.state;
    const { classes, me } = this.props;
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
                  color="#2d7cc1"
                  loading={isLoading}
                />
              </div>
            ) : ('')}

            <aside id="sideNav">
              <Tabs
                value={selectedTab}
                onChange={this.handleChange}
                classes={{
                  root: classes.tabsRoot,
                  indicator: classes.tabsIndicator,
                }}
              >
                <Tab
                  label="Profiles"
                  classes={{ root: classes.tabRoot }}
                />
                <Tab
                  label="Properties"
                  disabled
                  classes={{ root: classes.tabRoot }}
                />
                <Tab
                  label="Stories"
                  disabled
                  classes={{ root: classes.tabRoot }}
                />
              </Tabs>
              <Route component={Groups} />
            </aside>
            <Route component={Messages} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  me: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    me: state.user.me,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Layout));

