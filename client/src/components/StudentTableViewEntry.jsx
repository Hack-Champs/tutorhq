import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'semantic-ui-react';

const StudentTableViewEntry = ({ session, i }) => {
  return (
    <Table.Row>
      <Table.Cell>{ session.date }</Table.Cell>
      <Table.Cell>{ session.time }</Table.Cell>
      {/* <Table.Cell>Session Length: { session.time.billableTime }</Table.Cell> */}
    </Table.Row>
  );
};

export default StudentTableViewEntry;
