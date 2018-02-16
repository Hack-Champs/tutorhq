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
import InvoiceCreateView from './InvoiceCreateView.jsx';
import SubscriptionsView from './SubscriptionsView.jsx';
import HomeView from './HomeView.jsx';
import axios from 'axios';
import _ from 'lodash';
import AOS from 'aos';


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
      visible: true,
      view: 'dashboard',
      componentInitialized: false,
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

  componentWillUpdate() {
    if (!this.state.componentInitialized) {
      this.resetComponent();
      this.getTutorInfo();
      this.setState({
        componentInitialized: true,
      });
    }
  }

  getTutorInfo() {
    axios.get(`/dashboard/${this.props.tutor}`, {
      params: {
        tutor: this.props.tutor,
      }
    })
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
      tutor: this.props.tutor,
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
    const colors = [
      'red', 'orange', 'yellow', 'green', 'teal',
      'blue', 'violet', 'purple', 'pink',
    ];
    let descriptionSection;
    let currentView;
    console.log('Current subjects: ', this.state.subjects);
    if (this.state.editing) {
      descriptionSection = (
        <Form>
          <Form.TextArea onChange={this.changeDescription} label='Description' placeholder='Please add a description' value={this.state.description} />
          <Form.Button basic color="black" floated="right" onClick={this.submitDescription}>Save</Form.Button>
        </Form>
      );
    } else {
      if (this.props.tutor) {
        descriptionSection = (
          <div>
            <Segment color="black">
              {this.state.description}
            </Segment>
            <Button basic color="black" floated="right" onClick={this.onEditClick}>Edit</Button>
          </div>
        );
      } else {
        descriptionSection = (
          <div>
            <Segment color="black">
              {this.state.description}
            </Segment>
          </div>
        );
      }
    }

    if (this.state.view === 'dashboard') {
      currentView = (
        <div >
          <Container className="dashboardviews" >
            <h1 className="viewHeader">Dashboard</h1>
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
        <div>
          <Container className="dashboardviews">
            <h1 className="viewHeader">Students</h1>
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
      );
    } else if (this.state.view === 'invoices') {
      currentView = (
        <div className="dashboardviews">
          <InvoiceListView tutor={this.props.tutor} />
        </div>
      );
    } else if (this.state.view === 'subscriptions') {
      currentView = (
        <div className="dashboardviews">
          <SubscriptionsView />
        </div>
      );
    } else {
      currentView = (
        <div>
          <Container className="dashboardviews">
            <h1 className="profileHeader">Tutor Profile</h1>
            <Icon name="mail outline" size="large"/>{this.props.email}
            <br/>
            <br/>
            <Rating
              icon='star'
              rating={this.state.rating}
              maxRating={5}
              onRate={this.onRate}
              clearable
            />
            <hr />
            <br />
            <br />
            <Grid stackable data-aos="fade-down">
              <Grid.Column mobile={8} tablet={12} computer={12}>
                <Grid.Row>
                  <Icon name="user outline" size="large"/>About the Tutor
                  <br/>
                  <br/>
                  {descriptionSection}
                </Grid.Row>
                <Grid.Row>
                  <Icon name="bookmark outline" size="large"/>Subjects
                  <br/>
                  <form onSubmit={this.onSubmit}>
                    <h4>Add a subject</h4>
                    <Search
                      input={{ icon: 'search', iconPosition: 'left' }}
                      loading={isLoading}
                      onResultSelect={this.handleResultSelect}
                      onSearchChange={this.handleSearchChange}
                      results={results}
                      value={newSubject}
                      {...this.props}
                    />
                    <br/>
                  </form>
                  <div>
                    {this.state.subjects.map((subject, i) => {
                      return <Label circular color={colors[Math.floor(Math.random() * 8)]} size='huge' key={i} as='subject' basic>{subject}</Label>;
                    })}
                  </div>
                </Grid.Row>
              </Grid.Column>

              <ProfileView email={this.props.email} />

            </Grid>
          </Container>
        </div>
      );
    }

    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='dashboard' href="/#/dashboard" onClick={this.setView.bind(name, 'dashboard')}>
              <Image className="sidebarImage" src='https://i.imgur.com/KGxefXR.png' size='mini' centered />
              Dashboard
            </Menu.Item>
            <Menu.Item name='profile' href="/#/dashboard" onClick={this.setView.bind(name, 'profile')}>
            <Image className="sidebarImage" src='https://i.imgur.com/NPTPrq1.png' size='mini' centered />
              Profile
            </Menu.Item>
            <Menu.Item name='students' href="/#/dashboard" onClick={this.setView.bind(name, 'students')}>
            <Image className="sidebarImage" src='https://i.imgur.com/GoTXYmd.png' size='mini' centered />
              Students
            </Menu.Item>
            <Menu.Item name='invoices' href="/#/dashboard" onClick={this.setView.bind(name, 'invoices')}>
            <Image className="sidebarImage" src='https://i.imgur.com/7ZO6t7i.png' size='mini' centered />
              Invoices
            </Menu.Item>
            <Menu.Item name='subscriptions' href="/#/dashboard" onClick={this.setView.bind(name, 'subscriptions')}>
            <Image className="sidebarImage" src='https://i.imgur.com/0vrLU3H.png' size='mini' centered />
              Subscriptions
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
