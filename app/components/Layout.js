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
import authorizeUser from '../actions/user';
import Heading from './Group/Heading';

const styles = theme => ({
  tabsRoot: {
    marginLeft: 0,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
  tabsIndicator: {
    background: '#fafafa',
  },
  tabSelected: {
    background: '#43444f',
  },
  tabRoot: {
    color: '#43444f',
    marginRight: 0,
    marginLeft: 0,
    minWidth: 110,
    fontSize: '12px',
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Layout extends React.Component {
  state = {
    selectedTab: 0,
  };

  componentDidMount() {
    authorizeUser();
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
                  color="#43444f"
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
                  disableRipple
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
              <div id="groupSearch">
                <Heading />
              </div>
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

