import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Button, Container, List, Grid, Segment } from 'semantic-ui-react';
import AOS from 'aos';

class SubscriptionsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <div id="subscriptionsHeader">
          <center>
            <h1 className="pricingHeader">Pricing</h1>
          </center>
          <h3 className="pricingDescription">
            TutorHQ is free to use.<br />Upgrade your classroom to bolster it
            with even better features.
          </h3>
        </div>
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <center>
                <Segment
                  className="pricingSegment"
                  data-aos="flip-left"
                  data-aos-duration="1500"
                >
                  <h1 className="pricingInfo">TutorHQ</h1>
                  <h3>Free</h3>
                  <List as="ul">
                    <List.Item as="li">Scheduling Tool</List.Item>
                    <List.Item as="li">Video Chat</List.Item>
                  </List>
                  <Button
                    href="/auth/google"
                    className="subscriptionButtons"
                    color="grey"
                  >
                    Get Started For Free
                  </Button>
                </Segment>
              </center>
            </Grid.Column>
            <Grid.Column>
              <center>
                <Segment
                  className="pricingSegment"
                  data-aos="flip-right"
                  data-aos-duration="1500"
                >
                  <h1 className="pricingInfo">TutorHQ Premium</h1>
                  <h3>Only $4.99/mo</h3>
                  <List as="ul">
                    <List.Item as="li">Whiteboard</List.Item>
                    <List.Item as="li">Text Editor</List.Item>
                  </List>
                  <h3>Start your 30 day free trial!</h3>
                  <Button
                    size="small"
                    as={Link}
                    to="/subscribe"
                    className="upgradeButtons"
                  >
                    Upgrade to TutorHQ Premium
                  </Button>
                </Segment>
              </center>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default SubscriptionsView;
