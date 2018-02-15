import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'semantic-ui-react';

const StudentTableViewEntry = ({ session, student, booking, i }) => {
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{`Session date: ${session.date}`}</Table.Cell>
          <Table.Cell>{ `Session Time: ${session.time}`}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default StudentTableViewEntry;
