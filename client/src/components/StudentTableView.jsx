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
      <Table color={'black'} fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Student</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Appointment</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.booking[studentName].sessions.map((session, i) => (
            <StudentTableViewEntry
              session={session}
              student={studentName[0]}
              booking={this.props.booking}
              key={i}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default StudentTableView;
