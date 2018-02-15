import React from 'react';
import { Grid, Form } from 'semantic-ui-react';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Grid.Column mobile={4} tablet={4} computer={4}>
        <Form method='GET' action={`mailto:${this.props.email}`}>
          <Form.Input name='subject' fluid label='Your name' placeholder='Your name' />
          <Form.Input fluid label='Email' placeholder='Email' />
          <Form.TextArea name='body' label='Your message' placeholder='Request an appointment...' />
          <Form.Button id="sendEmailButton" name='submit'>Submit</Form.Button>
        </Form>
      </Grid.Column>
    );
  }
}

export default ProfileView;
