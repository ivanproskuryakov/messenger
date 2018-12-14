import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ResizableTextArea from '../ResizableTextarea';

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
      <div id="message-write">
        <input
          accept="image/*"
          className={classes.input}
          id="flat-button-file"
          multiple
          type="file"
        />
        <Button id="button-send" variant="contained" color="primary" className={classes.button}>
          Send
        </Button>
        <ResizableTextArea />
      </div>
    );
  }
}

Write.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Write);
