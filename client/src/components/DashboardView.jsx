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
      subjects: [],
      tutor: '',
      isLoading: false,
      results: [],
      newSubject: '',
      rating: 3,
      editing: false
    };
    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addSubject = this.addSubject.bind(this);
    this.onRate = this.onRate.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.submitDescription = this.submitDescription.bind(this);
    this.getTutorInfo = this.getTutorInfo.bind(this);
  }

  componentDidMount() {
    this.resetComponent();
    this.getTutorInfo();
  }

  getTutorInfo() {
    axios.get(`/dashboard/${this.props.tutor}`)
      .then((response) => {
        this.setState({
          description: response.data[0].description,
          subjects: [...this.state.subjects, ...response.data[0].subjects]
        });
      })
      .catch((error) => {
        console.error(`GET request error: ${error}`);
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
    axios.put(`/dashboard/${this.props.tutor}`, {
      description: this.state.description,
      subjects: [...this.state.subjects, subject],
    })
      .then((response) => {
        this.setState({
          description: response.data.description,
          subjects: response.data.subjects,
        });
      })
      .catch((error) => {
        console.error('PUT request error: ', error);
      });
  }

  onRate(e, data) {
    this.setState({
      rating: data.rating,
    });
  }

  onEditClick(e) {
    e.preventDefault();
    this.setState({
      editing: true,
    });
  }

  changeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  submitDescription(e) {
    e.preventDefault();
    this.setState({
      editing: false,
    });

    axios.put(`/dashboard/${this.props.tutor}`, {
      description: this.state.description,
    })
      .then((response) => {
        this.setState({
          description: response.data.description,
        });
      })
      .catch((error) => {
        console.error('PUT request error: ', error);
      });
  }

  render () {
    const { isLoading, results, newSubject } = this.state;
    let descriptionSection;

    if (this.state.editing) {
      descriptionSection = (
        <Form>
          <Form.TextArea onChange={this.changeDescription} label='Description' placeholder='Please add a description' value={this.state.description} />
          <Form.Button basic color="blue" floated="right" onClick={this.submitDescription}>Save</Form.Button>
        </Form>
      );
    } else {
      descriptionSection = (
        <div>
          <Segment color="blue">
            {this.state.description}
          </Segment>
          <Button basic color="blue" floated="right" onClick={this.onEditClick}>Edit</Button>
        </div>
      );
    }

    return (
      <div>
        <Container>
          <Header as='h2' className="profileheader">Tutor Profile</Header>
          <Rating
            icon='star'
            rating={this.state.rating}
            maxRating={5}
            onRate={this.onRate}
            clearable
          />
          {descriptionSection}
        </Container>
        <Container>
          <h2>Subjects</h2>
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
          <div>
            {this.state.subjects.map((subject, i) => {
              return <Label key={i} as='subject' basic>{subject}</Label>;
            })}
          </div>

        </Container>
        <Container>
          <AvailabilityView
            tutor={ this.props.tutor }
          />
        </Container>
      </div>
    );
  }
}

export default DashboardView;
