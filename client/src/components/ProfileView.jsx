import React from 'react';
import { Grid, Form } from 'semantic-ui-react';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Grid>
        <Grid.Column mobile={12} tablet={8} computer={16}>
          <Form method='GET' action={`mailto:${this.props.email}`}>
            <Form.Input name='subject' fluid label='Your name' placeholder='Your name' />
            <Form.Input fluid label='Email' placeholder='Email' />
            <Form.TextArea name='body' label='Your message' placeholder='Request an appointment...' />
            <Form.Button id="addBookingButton" name='submit'>Submit</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ProfileView;
