import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { classes } = this.props;

    return (
      <div id="write-message">
        <input
          accept="image/*"
          className={classes.input}
          id="flat-button-file"
          multiple
          type="file"
        />
        <Button component="span" className={classes.button}>
          Upload
        </Button>
        <Button id="send-message" variant="contained" color="primary" className={classes.button}>
          Send
        </Button>
      </div>
    );
  }
}

Write.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Write);
