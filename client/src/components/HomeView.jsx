import React from 'react';
import ReactDOM from 'react-dom';
import DashboardView from './DashboardView.jsx';
import { Link, Route, Switch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import AOS from 'aos';

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
        <div className="ui container home masthead">
          <h1 className="ui inverted header">
          Tutor HQ
          </h1>
          <button className="ui white button">TUTORS</button>
        </div>
        <h1 className="explanation">How it works</h1>
        <br/>
        <div className="ui section hidden divider"></div>
        <div className="ui three column center aligned stackable grid container">
          <div className="column">
            <img data-aos="flip-down" className="ui centered small circular image" src="http://semantic-ui-forest.com/static/images/templates/semantic-ui/wireframe/square-image.png" />
            <h1 className="ui header">
              Heading
            </h1>
            <p>
              Insert description here
            </p>
            <div className="ui basic button">
              View details &raquo;
            </div>
          </div>
          <div className="column">
            <img data-aos="flip-down" className="ui centered small circular image" src="http://semantic-ui-forest.com/static/images/templates/semantic-ui/wireframe/square-image.png" />
            <h1 className="ui header">
              Heading
            </h1>
            <p>
              Insert description here
            </p>
            <div className="ui basic button">
              View details &raquo;
            </div>
          </div>
          <div className="column">
            <img data-aos="flip-down" className="ui centered small circular image" src="http://semantic-ui-forest.com/static/images/templates/semantic-ui/wireframe/square-image.png" />
            <h1 className="ui header">
              Heading
            </h1>
            <p>
              Insert description here
            </p>
            <div className="ui basic button">
              View details &raquo;
            </div>
          </div>
        </div>


        <div className="ui container">
          <div className="ui grid">
            <div className="ten wide column">
              <p className="tutorDescription" data-aos="fade-down">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in tellus sit amet tortor pellentesque consequat. Duis ex ante, pharetra nec molestie bibendum, porttitor et urna. Cras nisl ante, rhoncus at elit sit amet, blandit semper quam. Fusce id commodo nunc. Fusce vestibulum porta ornare. Maecenas efficitur posuere mollis. </p>
            </div>
            <div className="six wide column">
              <img data-aos="fade-left" src="http://semantic-ui-forest.com/static/images/templates/semantic-ui/wireframe/square-image.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
