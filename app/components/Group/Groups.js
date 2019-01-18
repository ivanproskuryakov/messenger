import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import Group from './Group';
import { selectGroup, loadGroups } from '../../actions/group';
import { loadMessages } from '../../actions/message';

const styles = ({
  List: {
    padding: 0,
    margin: 0,
  },
  ListItem: {
    padding: 0,
    margin: 0,
  },
});

class Groups extends React.Component {
  componentDidMount() {
    loadGroups();
  }

  onGroupClick = (event, group) => {
    selectGroup(group);
    loadMessages(group.id);
  };

  render() {
    const {
      classes,
      collection,
      selected,
    } = this.props;

    if (collection.length === 0) {
      return (
        <aside id="groups">
          <PeopleOutline className="noResults" />
        </aside>
      );
    }

    return (
      <aside id="groups">
        <div className="items">
          <List component="nav" className={classes.List}>
            {collection.map(group => (
              <ListItem
                key={group.name}
                button
                onClick={event => this.onGroupClick(event, group)}
                className={`userItem ${selected.id === group.id ? '__active' : ''} ${classes.ListItem}`}
              >
                <Group
                  group={group}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </aside>
    );
  }
}

Groups.propTypes = {
  classes: PropTypes.object.isRequired,
  collection: PropTypes.array.isRequired,
  selected: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
Groups.defaultProps = {
  match: {},
  selected: {
    id: null,
  },
};

function mapStateToProps(state) {
  return {
    collection: state.group.collection,
    selected: state.group.selected,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Groups));
