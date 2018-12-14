import React from 'react';

class ResizableTextArea extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      rows: 1,
      minRows: 1,
      maxRows: 10,
    };
  }

  /**
   * @param event
   */
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

    this.setState({
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };

  render() {
    const { value, rows } = this.state;
    return (
      <textarea
        rows={rows}
        value={value}
        placeholder="Type a message..."
        onChange={this.handleChange}
      />
    );
  }
}

export default ResizableTextArea;
