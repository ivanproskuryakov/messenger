import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  root: {},
});

class Message extends React.Component {
  render() {
    const { message } = this.props;
    return (
      <div className="message">
        {message.text}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Message);
