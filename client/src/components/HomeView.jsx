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
        <div>
          <h1 className = "ui inverted header">
            Tutor HQ
          </h1>
        </div>
        <br />
        <center><h1>How it works</h1></center>
        <div className = "ui equal width grid">
          <div className = "column">
            <center><img src="http://shashgrewal.com/wp-content/uploads/2015/05/default-placeholder-300x300.png" /></center>
          </div>
        <div className = "column">
          <center><img src="http://shashgrewal.com/wp-content/uploads/2015/05/default-placeholder-300x300.png" /></center>
        </div>
        <div className = "column">
          <center><img src="http://shashgrewal.com/wp-content/uploads/2015/05/default-placeholder-300x300.png" /></center>
        </div>
      </div>
    </div>
    );
  }
}

export default HomeView;
