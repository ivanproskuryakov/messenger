import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import AttachFile from '@mui/icons-material/AttachFile';
import Send from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Face from '@mui/icons-material/Face';
import { Picker } from 'emoji-mart';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';

import { sendMessage, editText } from '../../service/message/editor';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      emojiOpened: false,
    };
  }

  showEmoji = () => {
    this.setState((state) => ({
      emojiOpened: !state.emojiOpened,
    }));
  };

  hideEmoji = () => {
    this.setState({
      emojiOpened: false,
    });
  };

  send = () => {
    sendMessage();
  };

  emojiClick = (emoji) => {
    const { text } = this.props;
    editText(text + emoji.native);
  };

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  onChange = (event) => {
    editText(event.target.value);
  };

  render() {
    const { classes, text } = this.props;
    const { emojiOpened } = this.state;

    return (
      <div id="messageWrite">
        <div className="messageContainer">
          <ClickAwayListener onClickAway={this.hideEmoji}>
            <div>
              <IconButton
                id="buttonEmoji"
                color="default"
                className={classes.button}
                onClick={(event) => this.showEmoji(event, emojiOpened)}
                component="span"
              >
                <Face />
              </IconButton>
              {emojiOpened ? (
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
          <IconButton
            id="buttonSend"
            color="default"
            className={classes.button}
            component="span"
            onClick={this.send}
          >
            <Send />
          </IconButton>
          <Textarea
            value={text}
            placeholder="Write a message..."
            onKeyPress={this.onKeyPress}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

Write.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    text: state.message.text,
  };
}

export default makeStyles(styles)(connect(mapStateToProps)(Write));

