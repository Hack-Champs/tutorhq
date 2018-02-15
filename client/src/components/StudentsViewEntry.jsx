import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, List, Icon } from 'semantic-ui-react';
import StudentTableView from './StudentTableView.jsx';
import AOS from 'aos';
class StudentsViewEntry extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.student);
    let info = (
      <div>
        <h3 align="left" className="studentName"> {this.props.student.name}</h3>
        <h3 align="left" className="studentEmail"> Email: {this.props.student.email}</h3>
        <h3 align="left" className="studentEmail"> Notes: {this.props.student.notes}</h3>
      </div>);
    return (
      <Grid columns={2} celled data-aos="fade-down" data-aos-duration="1000" >
        <Grid.Row>
          <Grid.Column width={6} className="studentInfoColumn">
            {info}
          </Grid.Column>
          <Grid.Column width={10}>
            {this.props.bookings.map((booking, i) =>
              <StudentTableView key={ i } booking = { booking } student={this.props.student.name}/>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default StudentsViewEntry;

