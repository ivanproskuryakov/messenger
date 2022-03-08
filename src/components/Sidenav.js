import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@mui/styles';

import Rooms from './Room/Rooms';
import authorizeUser from '../service/user';
import Heading from './Room/Heading';

const styles = (theme) => ({
  sideNav: {
    borderRight: '1px solid rgba(0, 0, 0, 0.1)',
    width: '350px',
    height: '100vh',
    position: 'relative',
    paddingTop: '1px',
  },
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
  componentDidMount() {
    authorizeUser();
  }

  render() {
    const { classes } = this.props;

    return (
      <aside className={classes.sideNav}>
        <Heading />
        <Rooms />
      </aside>
    );
  }
}

Sidenav.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    rooms: state.room.collection,
    me: state.user.me,
  };
}

export default makeStyles(styles)(connect(mapStateToProps)(Sidenav));

