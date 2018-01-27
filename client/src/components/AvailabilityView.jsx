import React from 'react';
import ReactDOM from 'react-dom';
import DayPicker from 'react-day-picker';
import BookingView from './BookingView.jsx'
import { Button, Container, Input } from 'semantic-ui-react';


class AvailabilityView extends React.Component {
  constructor(props) {
    super(props);
    this.captureName = this.captureName.bind(this);
    this.captureTime = this.captureTime.bind(this);
    this.dateClick = this.dateClick.bind(this);
    this.addSession = this.addSession.bind(this);
    this.testFunction = this.testFunction.bind(this);
    this.state = {
      name: '',
      date: '',
      time: '',
      sessions: [{
        name: 'add new users here',
        date: '1/17/2018',
        time: '3',
      }]
    };
  }

  captureName(e) {
    this.setState({
      name: e.target.value
    })
    console.log(this.state.name);
  }


  captureTime(e) {
    this.setState({
      time: e.target.value
    })
    console.log(this.state.time);
  }

  dateClick(day) {
    this.setState({ date: day })
  }

  addSession() {
    var newSession = {
      name: this.state.name,
      date: this.state.date.toLocaleDateString(),
      time: this.state.time
    };
    var newSessionList = this.state.sessions.slice();
    newSessionList.push(newSession);
    this.setState({
      sessions: newSessionList
    })
    document.getElementById('nameInput').value = '';
    document.getElementById('timeInput').value = '';
  }

  testFunction() {
    var newSession = {
      name: this.state.name,
      date: this.state.date,
      time: this.state.time
    };
    this.state.sessions.push(newSession);
    console.log(this.state.sessions);
  }

  render () {
    return (
      <Container>
        <div>
          <p>Name</p>
          <Input id="nameInput" onChange={ this.captureName }></Input>
          <p>Time</p>
          <Input id="timeInput" onChange={ this.captureTime }></Input>
        </div>
        <div>
          { this.state.date ? (
            <p>You picked { this.state.date.toLocaleDateString()}</p>
          ) : (
            <p>Choose a date</p>
          )}
          <DayPicker onDayClick={ this.dateClick } />
        </div>
        <Button primary onClick={ this.addSession }>Add Session</Button>
        <Button secondary onClick= { this.testFunction }>tester</Button>
        <BookingView sessions={ this.state.sessions }/>
      </Container>
    );
  }
}

export default AvailabilityView;

// (do not delete)
// example: input field with dropdown calendar
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// <DayPickerInput />
