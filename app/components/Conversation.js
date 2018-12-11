import React from 'react';
import PropTypes from 'prop-types';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { name } = this.props;

    return (

      <section id="conversation">
        <div className="content">
          conversations {name}
        </div>
      </section>
    );
  }
}

Conversation.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Conversation;
