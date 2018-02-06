import React from 'react';
import ReactDOM from 'react-dom';
import DayPicker from 'react-day-picker';
import BookingView from './BookingView.jsx';
import axios from 'axios';
import { Dropdown, Grid, Button, Container, Input } from 'semantic-ui-react';
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
    this.getStudents = this.getStudents.bind(this);
    this.addBooking = this.addBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
    this.selectStudent = this.selectStudent.bind(this);
    this.state = {
      date: '',
      time: '',
      now: moment().hour(12).minute(0),
      format: 'h:mm a',
      bookings: [],
      students: [],
      selectedStudent: null,
    };
  }

  componentDidMount() {
    this.getBookings();
    this.getStudents();
  }

  getBookings() {
    // losing this.props.tutor when directly refreshing dashboard, why?
    console.log('tutor username: ' + this.props.tutor);
    axios.get(`/users/${this.props.tutor}/bookings`)
      .then(response => {
        console.log(response);
        this.setState({
          bookings: response.data
        });
      })
      .catch(error => {
        console.log(`GET request error: ${error}`);
      });
  }

  getStudents() {
    axios.get(`/users/${this.props.tutor}/students`)
      .then(response => {
        console.log(response);
        this.setState({
          students: response.data
        });
      })
      .catch(error => {
        console.log(`GET request error: ${error}`);
      });
  }

  captureName(e) {
    console.log('The e', e);
    var selected = this.state.students.find((student) => {
      return student.name === e.currentTarget.textContent;
    });

    this.setState({
      selectedStudent: selected
    });
    console.log('Current student: ', this.state.selectedStudent);
  }

  captureTime(value) {
    var selectedTime = value && value.format(this.state.format);
    this.setState({
      time: selectedTime
    });
  }

  dateClick(day) {
    this.setState({ date: day });
  }

  addBooking() {
    var newSession = {
      student: this.state.selectedStudent,
      date: this.state.date.toLocaleDateString(),
      time: this.state.time
    };
    console.log('New Session: ', newSession);
    axios.post(`/users/${this.props.tutor}/booking`, newSession)
      .then((response) => {
        console.log(response);
        this.setState({
          bookings: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    document.getElementById('nameInput').value = '';
    document.getElementById('timeInput').value = '';
    this.setState({selectedStudent: null});
  }

  deleteBooking(bookingID) {
    axios.delete(`/users/${this.props.tutor}/booking/${bookingID}`)
      .then(response => {
        this.setState({
          bookings: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  selectStudent() {
    const student = this.state.students[0];
    this.setState({selectedStudent: student});
    document.getElementById('nameInput').value = student.name;
  }

  // button for debugging purposes, don't delete
  testFunction(value) {
    this.selectStudent();
  }

  render () {
    const options = [];
    var students = this.state.students;
    students.forEach((student) => {
      options.push({text: student.name, value: student.name});
    });

    console.log('List of the students ', options);

    return (
      <div>
        <Grid stackable>
          <Grid.Row columns={3}>
            <Grid.Column width={5} className="timeInput" id="timeInput" >
              <div>

                <p>Name</p>
                <Dropdown placeholder='Student' search selection options={options} onChange={ this.captureName.bind(options.value) }/>
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
                displayName={ this.props.displayName }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </div>
    );
  }
}

export default AvailabilityView;
