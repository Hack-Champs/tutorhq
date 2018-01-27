import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'semantic-ui-react';

const BookingViewEntry = ({ session }) => (
  <Table.Row>
    <Table.Cell>{session.name}</Table.Cell>
    <Table.Cell>{session.date}</Table.Cell>
    <Table.Cell>{session.time}</Table.Cell>
  </Table.Row>
)

export default BookingViewEntry;
