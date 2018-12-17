import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Face from '@material-ui/icons/Face';
import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import { Picker } from 'emoji-mart';

import ResizableTextArea from '../ResizableTextarea';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    bottom: 75,
    right: 0,
  },
  fake: {
    backgroundColor: grey[200],
    height: theme.spacing.unit,
    margin: theme.spacing.unit * 2,
    '&:nth-child(2n)': {
      marginRight: theme.spacing.unit * 3,
    },
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

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  emojiClick = (emoji, event) => {
    console.log(emoji, event);
  };

  handleClickAway = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div id="messageWrite">
        <div className="messageContainer">
          <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <div>
              <IconButton
                id="buttonEmoji"
                color="default"
                className={classes.button}
                onClick={this.handleClick}
                component="span"
              >
                <Face />
              </IconButton>
              {open ? (
                <Paper className={classes.paper}>
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
