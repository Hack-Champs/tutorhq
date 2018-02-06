import React from 'react';
import ReactDOM from 'react-dom';
import StudentsViewEntry from './StudentsViewEntry.jsx';
import CreateStudentView from './CreateStudentView.jsx';
import { List, Container, Grid, Table, Button } from 'semantic-ui-react';

class StudentsView extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {

    return (
      <div>
        <CreateStudentView tutor = {this.props.tutor} createstudent={this.props.createstudent} />
        <List horizontal relaxed>
          {this.props.students.map((student, i) =>
            <StudentsViewEntry key={ i } student = { student } />
          )}
        </List>

      </div>
    );
  }
}

export default StudentsView;

