import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'semantic-ui-react';

const StudentTableViewEntry = ({ session, student, booking, i }) => {
  return (
    <Table.Row>
      <Table.Cell>{student}</Table.Cell>
      <Table.Cell>{booking[student].email}</Table.Cell>
      <Table.Cell>{`${session.date}, ${session.time}`} </Table.Cell>
      <Table.Cell>Notes: {booking[student].notes}</Table.Cell>
      {/* <Table.Cell>Session Length: { session.time.billableTime }</Table.Cell> */}
    </Table.Row>
  );
};

export default StudentTableViewEntry;
