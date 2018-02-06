import React from 'react';
import ReactDOM from 'react-dom';
import BookingViewEntry from './BookingViewEntry.jsx';
import { Table } from 'semantic-ui-react';

const BookingView = ({ bookings, deleteBooking, displayName }) => (
  <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Student</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Time</Table.HeaderCell>
        <Table.HeaderCell>Room</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      { bookings.map(booking =>
        <BookingViewEntry
          booking={ booking }
          deleteBooking={ deleteBooking }
          displayName={ displayName }
          key={ booking._id }
        />
      ) }
    </Table.Body>
  </Table>
);

export default BookingView;
