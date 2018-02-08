import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'semantic-ui-react';
import StudentTableViewEntry from './StudentTableViewEntry.jsx';

class StudentTableView extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let studentName = Object.keys(this.props.booking);
    return (
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{studentName[0]}</Table.HeaderCell>
            <Table.HeaderCell>{this.props.booking[studentName].email}</Table.HeaderCell>
            <Table.HeaderCell>Notes: {this.props.booking[studentName].notes}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.booking[studentName].sessions.map((session, i) =>
            <StudentTableViewEntry session = { session } key = { i } /> )
          }
        </Table.Body>
      </Table>
    );
  }
}


export default StudentTableView;