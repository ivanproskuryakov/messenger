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

import store from '../../store';
import { messageSend, messageEdit } from '../../actions/message';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class Write extends React.Component {
  state = {
    emojiOpened: false,
    rows: 1,
    minRows: 1,
    maxRows: 10,
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
    store.dispatch(messageSend());
  };

  emojiClick = (emoji) => {
    const { text } = this.props;
    store.dispatch(messageEdit(text + emoji.native));
  };

  handleChange = (event) => {
    const lineHeight = 24;
    const { minRows, maxRows } = this.state;
    const previousRows = event.target.rows;

    event.target.rows = minRows;

    const currentRows = Math.floor(event.target.scrollHeight / lineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }
    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    store.dispatch(messageEdit(event.target.value));

    this.setState({
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };

  render() {
    const { classes, text } = this.props;
    const { emojiOpened, rows } = this.state;

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
          <textarea
            rows={rows}
            value={text}
            placeholder="Type a message..."
            onChange={this.handleChange}
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

