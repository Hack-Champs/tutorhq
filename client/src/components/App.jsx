import React from 'react';
import ReactDOM from 'react-dom';
import DashboardView from './DashboardView.jsx';
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
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' as={Link} to='/' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='dashboard' as={Link} to='/dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} />
          <Menu.Item name='tutors' as={Link} to='/tutors' active={activeItem === 'tutors'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item name='logout' as={Link} to='/tutors' active={activeItem === 'logout'} onClick={this.handleItemClick} />
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
