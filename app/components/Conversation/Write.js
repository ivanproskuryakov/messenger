import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Face from '@material-ui/icons/Face';
import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import { Picker } from 'emoji-mart';

import ResizableTextArea from '../ResizableTextarea';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class Write extends React.Component {
  state = {
    open: false,
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  handleClick = (event, open) => {
    this.setState({
      open: !open,
    });
  };

  handleClickAway = () => {
    this.setState({
      open: false,
    });
  };

  emojiClick = (emoji, event) => {
    console.log(emoji, event);
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div id="messageWrite">
        <div className="messageContainer">
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <div id="emojis">
              {open ? (
                <Paper className="emojisContainer">
                  <Picker
                    onClick={this.emojiClick}
                  />
                </Paper>
              ) : null}
            </div>
          </ClickAwayListener>
          <IconButton
            id="buttonEmoji"
            color="default"
            className={classes.button}
            onClick={event => this.handleClick(event, open)}
            component="span"
          >
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
