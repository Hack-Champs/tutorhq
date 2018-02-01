import React from 'react';
import ReactDOM from 'react-dom';
import DayPicker from 'react-day-picker';
import BookingView from './BookingView.jsx'
import axios from 'axios';
import { Grid, Button, Container, Input } from 'semantic-ui-react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

class AvailabilityView extends React.Component {
  constructor(props) {
    super(props);
    this.captureName = this.captureName.bind(this);
    this.captureTime = this.captureTime.bind(this);
    this.dateClick = this.dateClick.bind(this);
    this.testFunction = this.testFunction.bind(this);
    this.getBookings = this.getBookings.bind(this);
    this.addBooking = this.addBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
    this.state = {
      name: '',
      date: '',
      time: '',
      now: moment().hour(12).minute(0),
      format: 'h:mm a',
      bookings: []
    };
  }

  componentDidMount() {
    this.getBookings();
  }

  getBookings() {
    // losing this.props.tutor when directly refreshing dashboard, why?
    console.log('tutor username: ' + this.props.tutor);
    axios.get(`/users/${this.props.tutor}/bookings`)
      .then(response => {
        console.log(response);
        this.setState({
          bookings: response.data[0].bookings
        })
      })
      .catch(error => {
        console.log(`GET request error: ${error}`);
      })
  }

  captureName(e) {
    this.setState({
      name: e.target.value
    })
  }

  captureTime(value) {
    var selectedTime = value && value.format(this.state.format);
    this.setState({
      time: selectedTime
    })
  }

  dateClick(day) {
    this.setState({ date: day })
  }

  addBooking() {
    var newSession = {
      name: this.state.name,
      date: this.state.date.toLocaleDateString(),
      time: this.state.time
    };
    axios.post(`/users/${this.props.tutor}/booking`, newSession)
      .then(() => {
        this.getBookings();
      })
    document.getElementById('nameInput').value = '';
    document.getElementById('timeInput').value = '';
  }

  deleteBooking(bookingID) {
    axios.delete(`/users/${this.props.tutor}/booking/${bookingID}`)
      .then(response => {
        this.setState({
          bookings: response.data.bookings
        })
      });
  }

  // button for debugging purposes, don't delete
  testFunction(value) {

  }

  render () {
    return (
      <Container>
        <Grid stackable>
          <Grid.Row columns={3}>
            <Grid.Column width={5} className="timeInput">
              <div>
                <p>Name</p>
                <Input id="nameInput" placeholder="Student name" onChange={ this.captureName }></Input>
                <p className="formEntryTitle">Time</p>
                <TimePicker
                  showSecond={ false }
                  defaultValue={ this.state.now }
                  className="xxx"
                  onChange={ this.captureTime }
                  format={ this.state.format }
                  use12Hours
                />
              </div>
            </Grid.Column>
            <Grid.Column width={5} className="dateInput">
              <div>
                { this.state.date ? (
                  <p>You picked { this.state.date.toLocaleDateString()}</p>
                ) : (
                  <p align="right">Choose a date</p>
                )}
                <DayPicker onDayClick={ this.dateClick } />
              </div>
              <Button primary onClick={ this.addBooking }>Add Booking</Button>
              <Button secondary onClick= { this.testFunction }>tester</Button>
            </Grid.Column>
            <Grid.Column width={5} className="bookings">
              <BookingView
                bookings={ this.state.bookings }
                deleteBooking={ this.deleteBooking }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>
    );
  }
}

export default AvailabilityView;
