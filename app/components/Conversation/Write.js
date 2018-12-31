import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Face from '@material-ui/icons/Face';
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
    text: '',
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleClickAway = () => {
    this.setState({
      open: false,
    });
  };

  emojiClick = (emoji, event) => {
    console.log(event);
    console.log(emoji.native);
    this.setState(state => ({
      text: `${state.text} ${emoji.native}`,
    }));
  };

  render() {
    const { classes } = this.props;
    const { open, text } = this.state;

    return (
      <div id="messageWrite">
        <div className="messageContainer">
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <div>
              <IconButton
                id="buttonEmoji"
                color="default"
                className={classes.button}
                onClick={event => this.handleClick(event, open)}
                component="span"
              >
                <Face />
              </IconButton>
              {open ? (
                <Paper id="emojis">
                  <Picker
                    onClick={this.emojiClick}
                  />
                </Paper>
              ) : null}
            </div>
          </ClickAwayListener>
          <IconButton id="buttonUpload" color="default" className={classes.button} component="span">
            <AttachFile />
          </IconButton>
          <IconButton id="buttonSend" color="default" className={classes.button} component="span">
            <Send />
          </IconButton>
          <ResizableTextArea value={text} />
        </div>
      </div>
    );
  }
}

Write.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Write);
