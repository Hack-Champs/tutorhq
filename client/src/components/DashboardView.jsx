import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import { Container, Form, Header, Label, Segment } from 'semantic-ui-react';
import AvailabilityView from './AvailabilityView.jsx';

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      subjects: ['English', 'Mathematics', 'Science', 'Social Studies'],
      tutor: '',
    };
  }

  render () {
    return (
      <div>
        <Container>
          <Header as='h2'>Tutor Profile</Header>
          <Segment>
            This is a sample description.
          </Segment>
          <div>
            Subjects
            <div>
              {this.state.subjects.map((subject, i) => {
                return <Label key={i} as='subject' basic>{subject}</Label>;
              })}
            </div>
          </div>
          <AvailabilityView />
          <Switch>
            <Route path='/dashboard/:tutor' component={DashboardView} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default DashboardView;
