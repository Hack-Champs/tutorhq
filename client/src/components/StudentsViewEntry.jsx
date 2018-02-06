import React from 'react';
import ReactDOM from 'react-dom';
import { List, Icon } from 'semantic-ui-react';

class StudentsViewEntry extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <List.Item>
        <Icon circular name='user' />
        <List.Content>

          <List.Header as='a'>{this.props.student.name}</List.Header>
        </List.Content>
      </List.Item>
    );
  }
}

export default StudentsViewEntry;

