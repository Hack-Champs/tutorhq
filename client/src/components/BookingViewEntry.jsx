import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon, Table } from 'semantic-ui-react';

class BookingViewEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    var bookingID = e.target.id;
    this.props.deleteBooking(bookingID);
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.booking.studentName}</Table.Cell>
        <Table.Cell>{this.props.booking.date}</Table.Cell>
        <Table.Cell>{this.props.booking.time}</Table.Cell>
        <Table.Cell>
          <Button
            id='classroomButton'
            href={`/#/classroom/${this.props.booking.channelId}?tutor=${encodeURIComponent(this.props.displayName)}`} 
            target="_blank">
            Link
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Button circular
            className='bookingDeleteButton'
            color='grey'
            id={ this.props.booking._id }
            onClick={ this.handleDelete }
            icon='trash outline' >
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default BookingViewEntry;
