import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Face from '@material-ui/icons/Face';
import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { Picker } from 'emoji-mart';
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
  state = {
    anchorEmoji: null,
    open: false,
    placement: null,
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  showEmojiClick = (event) => {
    const placement = 'top-end';
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEmoji: currentTarget,
      open: state.placement !== placement || !state.open,
      placement,
    }));
  };

  emojiClick = (emoji, event) => {
    console.log(emoji, event);
  };

  render() {
    const { classes } = this.props;
    const { anchorEmoji, open, placement } = this.state;

    return (
      <div id="messageWrite">
        <Popper open={open} anchorEl={anchorEmoji} placement={placement} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Picker
                set="emojione"
                title="Pick your emoji..."
                defaultSkin="4"
                onClick={this.emojiClick}
              />
            </Fade>
          )}
        </Popper>

        <div className="messageContainer">
          <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
          <IconButton
            id="buttonEmoji"
            color="default"
            className={classes.button}
            onClick={this.showEmojiClick}
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
