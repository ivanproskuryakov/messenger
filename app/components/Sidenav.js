import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Groups from './Group/Groups';
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

class Sidenav extends React.Component {
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
    const { classes } = this.props;

    return (
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
        <Groups />
      </aside>
    );
  }
}

Sidenav.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    groups: state.group.collection,
    me: state.user.me,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Sidenav));

