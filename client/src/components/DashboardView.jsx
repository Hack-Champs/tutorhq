import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import { Container, Form, Header, Label, Segment } from 'semantic-ui-react';
import { Icon, Button, Grid, Search, Rating } from 'semantic-ui-react';
import { Sidebar, Menu, Image} from 'semantic-ui-react';
import AvailabilityView from './AvailabilityView.jsx';
import ProfileView from './ProfileView.jsx';
import StudentsView from './StudentsView.jsx';
import InvoiceListView from './InvoiceListView.jsx';
import InvoiceCreateView from './InvoiceCreateView.jsx'
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
      rating: 5,
      editing: false,
      visible: false,
      view: 'dashboard',
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
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.setView = this.setView.bind(this);
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

  toggleVisibility () {
    this.setState({ visible: !this.state.visible });
  }

  setView(e) {
    this.setState({view: e});
  }

  render () {
    const { isLoading, results, newSubject, visible, view } = this.state;
    let descriptionSection;
    let currentView;

    if (this.state.editing) {
      descriptionSection = (
        <Form>
          <Form.TextArea onChange={this.changeDescription} label='Description' placeholder='Please add a description' value={this.state.description} />
          <Form.Button basic color="blue" floated="right" onClick={this.submitDescription}>Save</Form.Button>
        </Form>
      );
    } else {
      if (this.props.tutor) {
        descriptionSection = (
          <div>
            <Segment color="blue">
              {this.state.description}
            </Segment>
            <Button basic color="blue" floated="right" onClick={this.onEditClick}>Edit</Button>
          </div>
        );
      } else {
        descriptionSection = (
          <div>
            <Segment color="blue">
              {this.state.description}
            </Segment>
          </div>
        );
      }
    }

    if (this.state.view === 'dashboard') {
      currentView = (
        <div className="dashboardviews">
          <Container >
            <AvailabilityView
              tutor={ this.props.tutor }
              students={ this.props.students }
              displayName={ this.props.displayName }
            />
          </Container>
        </div>
      );
    } else if (this.state.view === 'students') {
      currentView = (
        <div className="dashboardviews">
          <Container>
            <StudentsView
              students= { this.props.students }
              createstudent={this.props.createstudent}
            />
          </Container>
        </div>
      );
    } else if (this.state.view === 'createInvoice') {
      currentView = (
        <div className="dashboardviews">
          <InvoiceCreateView />
        </div>
      )
    } else if (this.state.view === 'invoices') {
      currentView = (
        <div className="dashboardviews">
          <InvoiceListView />
        </div>
      )
    } else {
      currentView = (
        <div className="dashboardviews">
          <Container>
            <Header as='h2' className="profileheader">Tutor Profile</Header>
            <div style={{'textAlign': 'center'}}>{this.props.email}</div>
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
            <ProfileView email={this.props.email} />
          </Container>
        </div>
      );
    }

    return (
      <div>
        <Button icon='list layout' onClick={this.toggleVisibility} />
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='dashboard' href="/#/dashboard" onClick={this.setView.bind(name, 'dashboard')}>
              <Icon name='calendar' />
              Dashboard
            </Menu.Item>
            <Menu.Item name='profile' href="/#/dashboard" onClick={this.setView.bind(name, 'profile')}>
              <Icon name='user circle outline' />
              Profile
            </Menu.Item>
            <Menu.Item name='students' href="/#/dashboard" onClick={this.setView.bind(name, 'students')}>
              <Icon name='users' />
              Students
            </Menu.Item>
            <Menu.Item name='invoices' href="/#/dashboard" onClick={this.setView.bind(name, 'invoices')}>
              <Icon name='money' />
              My Invoices
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>

            {currentView}

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default DashboardView;
