import React from 'react';
import ReactDOM from 'react-dom';
import DashboardView from './DashboardView.jsx';
import { Link, Route, Switch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
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
      </div>
    );
  }
}

export default HomeView;
