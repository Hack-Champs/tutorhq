import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button } from 'semantic-ui-react';
import axios from 'axios';

class CreateStudentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      notes: '',

    };

    this.createStudent = this.createStudent.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateNotes = this.updateNotes.bind(this);

  }

  updateName(e) {
    this.setState({name: e.target.value});
  }

  updateEmail(e) {
    this.setState({email: e.target.value});
  }

  updateNotes(e) {
    this.setState({notes: e.target.value});
  }
  createStudent() {
    this.props.createstudent(this.props.tutor, this.state.name, this.state.email, this.state.notes);
  }

  render () {

    return (
      <Form>
        <Form.Group widths='equal' >
          <Form.Input fluid label='Student Name' placeholder='Full name' required value={this.state.name} onChange={this.updateName} />

          <Form.Input fluid label='Student Email' placeholder='Email' required value={this.state.email} onChange={this.updateEmail}/>

        </Form.Group>

        <Form.TextArea label='Notes' placeholder='Enter notes here...' value={this.state.notes} onChange={this.updateNotes}/>

        <center><Form.Button id="addBookingButton" onClick={this.createStudent}>Create a new student</Form.Button></center>
      </Form>
    );
  }


}


export default CreateStudentView;
