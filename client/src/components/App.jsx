import React from 'react';
import ReactDOM from 'react-dom';
import DashboardView from './DashboardView.jsx';
import HomeView from './HomeView.jsx';
import { Link, Route, Switch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import axios from 'axios';
import browserHistory from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      tutors: '',
      isSignedIn: false,
      username: '',
      user: {},
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.logout = this.logout.bind(this);
    this.checkSession = this.checkSession.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    console.log('The user: ',this.state);
    this.checkSession();
  }

  checkSession() {
    axios.get('/session')
    .then((response) => {
        this.login();
    })
    .catch((err) => {
      this.setState({
        isSignedIn: false,
        user: {},
      })
    });
  }

  handleItemClick(e, { name }) {
    this.setState({
      activeItem: name,
    });
  }

  logout() {
    axios.get('/logout')
    .then((res) => {
      this.setState({
        activeItem: 'home',
        isSignedIn: res.data,
      })
      this.props.history.push('/');
    })
    .catch((err) => {

    })
  }

  login() {
    axios.get('/user')
    .then((user) => {
      this.setState({
        isSignedIn: true,
        user: user.data,
      })
    })
    .catch(() => {
      console.log('could not sign in');
    })

  }

  render () {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' as={Link} to='/' active={activeItem === 'home'} onClick={this.handleItemClick} replace />
          <Menu.Item name='dashboard' as={Link} to='/dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} replace />
          <Menu.Item name='tutors' as={Link} to='/tutors' active={activeItem === 'tutors'} onClick={this.handleItemClick} replace />
          <Menu.Menu position='right'>
            {this.state.isSignedIn ?
              <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.logout} replace /> :
              <a href='/auth/google'><Menu.Item name='login' active={activeItem === 'login'} onClick={this.login} replace /></a>
            }

          </Menu.Menu>
        </Menu>
        <Switch>
          <Route exact path='/' component={HomeView} />
          <Route path='/dashboard' component={DashboardView} />
        </Switch>
      </div>
    );
  }
}

export default App;
