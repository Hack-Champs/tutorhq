import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, List } from 'semantic-ui-react';

class SubscriptionsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <div id='subscriptionsHeader'>
          <h1 id='subscriptionTitle'>Pricing</h1>
          <h3>TutorHQ is free to use.<br/>Upgrade your classroom to bolster it with even better features.</h3>
        </div>
        <div className='ui grid'>
          <div className='eight wide column subscriptions'>
            <h1>TutorHQ</h1>
            <h3>Free</h3>
            <List as='ul'>
              <List.Item as='li'>Scheduling Tool</List.Item>
              <List.Item as='li'>Video Chat</List.Item>
            </List>
            <Button
              className='subscriptionButtons'
              color='grey'>
              Get Started For Free
            </Button>
          </div>
          <div className='eight wide column subscriptions'>
            <h1>TutorHQ Premium</h1>
            <h3>Only $4.99/mo</h3>
            <List as='ul'>
              <List.Item as='li'>Whiteboard</List.Item>
              <List.Item as='li'>Text Editor</List.Item>
            </List>
            <Button
              className='subscriptionButtons'
              color='teal'>
              Upgrade to TutorHQ Premium
            </Button>
          </div>
        </div>
      </Container>
    )
  }
}

export default SubscriptionsView;
