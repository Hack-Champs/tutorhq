import React from 'react';
import ReactDOM from 'react-dom';
import StudentsViewEntry from './StudentsViewEntry.jsx';
import StudentTableView from './StudentTableView.jsx';
import CreateStudentView from './CreateStudentView.jsx';
import { List, Container, Grid, Table, Button } from 'semantic-ui-react';
import axios from 'axios';

class StudentsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
    this.getBookings = this.getBookings.bind(this);
  }
  componentDidMount() {
    this.getBookings();
    console.log(this.state.bookings);
  }
  getBookings() {

    axios.get('/users/studentbookings')
      .then((res) => {
        this.setState({bookings: res.data});
        console.log('Bookings: ', this.state.bookings);
      })
      .catch((err) => {
        console.log('Could not get bookings');
      });
  }
  render () {

    return (
      <div>
        <CreateStudentView tutor = {this.props.tutor} createstudent={this.props.createstudent} />
        {this.props.students.map((student, i) =>
          <StudentsViewEntry key={ i } student = { student } bookings={this.state.bookings}/>
        )}
      </div>
    );
  }
}

export default StudentsView;
