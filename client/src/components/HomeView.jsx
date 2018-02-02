import React from 'react';
import ReactDOM from 'react-dom';
import DashboardView from './DashboardView.jsx';
import { Link, Route, Switch } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
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
          <Button id="getStartedButton" primary>Get Started</Button>
        </div>
        <h1 className="explanation">How It Works</h1>
        <br/>
        <div className="ui section hidden divider"></div>
        <div className="ui three column center aligned stackable grid container">
          <div className="column">
            <img data-aos="flip-down" className="ui centered small circular image" src="https://i.imgur.com/ku6GFDj.png" />
            <h1 className="ui header">
              Create Your Profile
            </h1>
            <p>
              TutorHQ allows you to create a free profile to showcase your qualifications and experience. Signing up is quick and easy with Google.
            </p>
            <div className="ui basic button">
              View details &raquo;
            </div>
          </div>
          <div className="column">
            <img data-aos="flip-down" className="ui centered small circular image" src="https://i.imgur.com/oQcfKmS.png" />
            <h1 className="ui header">
              Manage Your Business
            </h1>
            <p>
              Book sessions with students, track your lesson history, and collect student ratings and reviews to feature on your tutor profile.
            </p>
            <div className="ui basic button">
              View details &raquo;
            </div>
          </div>
          <div className="column">
            <img data-aos="flip-down" className="ui centered small circular image" src="https://i.imgur.com/HwdVznI.png" />
            <h1 className="ui header">
              Connect With Students
            </h1>
            <p>
              Our online classroom comes with a whiteboard, text editor, and video chat - everything you need to provide students with an interactive learning experience.
            </p>
            <div className="ui basic button">
              View details &raquo;
            </div>
          </div>
        </div>


        <div className="ui container">
          <div className="ui grid">
            <div className="ten wide column">
              <h4 className="tutorDescription" data-aos="fade-down">We’re always looking for talented tutors. Set your own rate, get paid and make a difference.</h4>
              <Button primary>Sign up!</Button>
            </div>
            <div className="six wide column">
              <img data-aos="fade-left" src="http://www.expertsminds.com/CMSImages/580_online_tutor.gif" />
            </div>
          </div>
        </div>
        <div className="ui inverted vertical footer segment">
          <div className="ui container">
            <div className="ui stackable inverted divided equal height stackable grid">
              <div className="four wide column">
                <h4 className="ui inverted header">Grant<br/>Scrum Master</h4>
              </div>
              <div className="four wide column">
                <h4 className="ui inverted header">Zay<br/>Product Owner</h4>
              </div>
              <div className="four wide column">
                <h4 className="ui inverted header">Luna<br/>Software Engineer</h4>
              </div>
              <div className="four wide column">
                <h4 className="ui inverted header">Henry<br/>Software Engineer</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
