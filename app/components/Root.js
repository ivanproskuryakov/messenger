import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Group from '@material-ui/icons/Group';
import LocationOn from '@material-ui/icons/LocationOn';
import LibraryBooks from '@material-ui/icons/LibraryBooks';

import { withStyles } from '@material-ui/core/styles';

import Users from './User/Users';
import Messages from './Message/Messages';

const styles = theme => ({
  tabsRoot: {
    height: 50,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
  tabsIndicator: {
    backgroundColor: '#43444f',
  },
  tabRoot: {
    color: '#43444f',
    marginTop: 1,
    marginRight: 0,
    minWidth: 89,
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Root extends React.Component {
  state = {
    selectedTab: 2,
  };

  handleChange = (event, selectedTab) => {
    this.setState({ selectedTab });
  };

  render() {
    const { selectedTab } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div id="layout">
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
                  icon={<Group />}
                  classes={{ root: classes.tabRoot }}
                />
                <Tab
                  icon={<LibraryBooks />}
                  classes={{ root: classes.tabRoot }}
                />
                <Tab
                  icon={<LocationOn />}
                  disabled
                  classes={{ root: classes.tabRoot }}
                />
              </Tabs>
              <Route component={Users} />
            </aside>
            <Route component={Messages} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

Root.propTypes = {
  classes: PropTypes.string.isRequired,
};

export default withStyles(styles)(Root);

