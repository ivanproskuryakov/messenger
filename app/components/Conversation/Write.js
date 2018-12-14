import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Face from '@material-ui/icons/Face';
import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
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
      <div id="messageWrite">
        <div className="messageContainer">
          <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
          <IconButton id="buttonEmoji" color="default" className={classes.button} component="span">
            <Face />
          </IconButton>
          <IconButton id="buttonUpload" color="default" className={classes.button} component="span">
            <AttachFile />
          </IconButton>
          <IconButton id="buttonSend" color="default" className={classes.button} component="span">
            <Send />
          </IconButton>
          <ResizableTextArea />
        </div>
      </div>
    );
  }
}

Write.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Write);
