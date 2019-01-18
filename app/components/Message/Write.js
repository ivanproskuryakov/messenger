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
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';

import { sendMessage, editText } from '../../service/message';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class Write extends React.Component {
  state = {
    emojiOpened: false,
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  showEmoji = () => {
    this.setState(state => ({
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
                onClick={event => this.showEmoji(event, emojiOpened)}
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

export default withStyles(styles)(connect(mapStateToProps)(Write));

