import React from 'react';
import ReactDOM from 'react-dom';
import DashboardView from './DashboardView.jsx';
import HomeView from './HomeView.jsx';
import { Link, Route, Switch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      tutors: '',
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({
      activeItem: name,
    });
  }

  render () {
    const activeItem = window.location.hash.slice(1);

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' as={Link} to='/' active={activeItem === '/'} onClick={this.handleItemClick} replace />
          <Menu.Item name='dashboard' as={Link} to='/dashboard' active={activeItem === '/dashboard'} onClick={this.handleItemClick} replace />
          <Menu.Item name='tutors' as={Link} to='/tutors' active={activeItem === '/tutors'} onClick={this.handleItemClick} replace />
          <Menu.Menu position='right'>
            <Menu.Item name='logout' as={Link} to='/tutors' active={activeItem === '/logout'} onClick={this.handleItemClick} replace />
          </Menu.Menu>
        </Menu>
        <Switch>
          <Route exact path='/' render={() => <HomeView />} />
          <Route path='/dashboard' render={() => <DashboardView />} />
        </Switch>
      </div>
    );
  }
}

export default App;
