import React from 'react';
import ReactDOM from 'react-dom';
import BookingViewEntry from './BookingViewEntry.jsx';
import { Table } from 'semantic-ui-react';

const BookingView = ({ sessions }) => (
  <Table striped>
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Student</Table.HeaderCell>
      <Table.HeaderCell>Date</Table.HeaderCell>
      <Table.HeaderCell>Time</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      { sessions.map(session => <BookingViewEntry session={ session }/> )}
    </Table.Body>
  </Table>
)

export default BookingView;
