import React from 'react';
import { Grid, Form } from 'semantic-ui-react';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Grid centered>
        <Grid.Column mobile={12} tablet={8} computer={4}>
          <Form action='mailto:'>
            <Form.Input fluid label='Your name' placeholder='Your name' />
            <Form.Input fluid label='Email' placeholder='Email' />
            <Form.TextArea label='Your message' placeholder='Request an appointment...' />
            <Form.Button>Submit</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ProfileView;
