import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
});

class Heading extends React.Component {
  render() {
    return (
      <div className="heading">
        <input className="search" type="text" placeholder="Search by name" />
      </div>
    );
  }
}

Heading.propTypes = {
};

export default withStyles(styles)(Heading);
