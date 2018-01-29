import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import { Container, Form, Header, Label, Segment } from 'semantic-ui-react';
import { Icon, Button, Grid, Search, Rating } from 'semantic-ui-react';
import AvailabilityView from './AvailabilityView.jsx';
import HomeView from './HomeView.jsx';
import axios from 'axios';
import _ from 'lodash';

const source = [
  {
    'title': 'English',
    'description': 'English',
    'image': '',
  },
  {
    'title': 'Mathematics',
    'description': 'Mathematics',
    'image': '',
  },
  {
    'title': 'Science',
    'description': 'Science',
    'image': '',
  },
  {
    'title': 'Social Studies',
    'description': 'Social Studies',
    'image': '',
  }
];

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      subjects: ['English', 'Mathematics', 'Science', 'Social Studies'],
      tutor: '',
      isLoading: false,
      results: [],
      newSubject: '',
      rating: 3,
    };
    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addSubject = this.addSubject.bind(this);
    this.onRate = this.onRate.bind(this);
  }

  componentWillMount() {
    this.resetComponent();

    axios.get('/dashboard')
      .then((response) => {
        console.log('getSubjects request response', response);
        this.setState({
          subjects: [...this.state.subjects, response.data],
        });
      })
      .catch((error) => {
        console.error('GET request error: ', error);
      });
  }

  resetComponent() {
    this.setState({
      isLoading: false,
      results: [],
      newSubject: '',
    });
  }

  handleResultSelect(e, { result }) {
    this.setState({
      newSubject: result.title,
    });
  }

  handleSearchChange(e, { newSubject }) {
    this.setState({
      isLoading: true,
      newSubject: e.target.value,
    });

    setTimeout(() => {
      if (this.state.newSubject.length < 1) {
        return this.resetComponent();
      }

      const re = new RegExp(_.escapeRegExp(this.state.newSubject), 'i');
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 500);
  }

  onSubmit(e) {
    e.preventDefault();
    this.addSubject(this.state.newSubject);
    this.setState({
      newSubject: '',
    });
  }

  addSubject(subject) {
    this.setState({
      subjects: [...this.state.subjects, subject],
    });
    // axios.post('/dashboard', {
    //   subject: subject,
    // })
    //   .then((response) => {
    //     this.setState({
    //       subjects: [...this.state.subjects, response.data],
    //     });
    //   })
    //   .catch((error) => {
    //     console.error('POST request error: ', error);
    //   });
  }

  onRate(e, data) {
    this.setState({
      rating: data.rating,
    });
  }

  render () {
    const { isLoading, results, newSubject } = this.state;

    return (
      <div>
        <Container>
          <Header as='h2'>Tutor Profile</Header>
          <Rating
            icon='star'
            rating={this.state.rating}
            maxRating={5}
            onRate={this.onRate}
            clearable
          />
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
          <Grid>
            <Grid.Column width={16}>
              <form onSubmit={this.onSubmit}>
                Add a subject
                <Search
                  input={{ icon: 'search', iconPosition: 'left' }}
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  value={newSubject}
                  {...this.props}
                />
              </form>
            </Grid.Column>
          </Grid>
          <AvailabilityView />
          <Switch>
            <Route path='/dashboard/:tutor' render={() => <DashboardView />} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default DashboardView;
