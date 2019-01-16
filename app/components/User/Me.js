import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { withStyles } from '@material-ui/core';

const styles = ({
  icon: {
    margin: 0,
  },
  avatar: {
    margin: 0,
    width: 35,
    height: 35,
  },
});

class Me extends React.Component {
  render() {
    const { me, classes } = this.props;

    return (
      <div id="myProfile">
        <Avatar
          src={me.photo}
          className={`avatar ${classes.avatar}`}
        />
        <div className="name">
          {me.name}
        </div>
      </div>
    );
  }
}

Me.propTypes = {
  me: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    me: state.user.me,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Me));
