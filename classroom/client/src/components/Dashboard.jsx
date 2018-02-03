import React, { Component } from 'react';
import $ from 'jquery';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorName: 'Sam',
      link: "www.sdfs.com"
    }
    this.sendLink = this.sendLink.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const $emailInput = $('#email-input')
    var email = $emailInput.val();
    console.log(email)
    if (email) {
      this.sendLink(email, this.state.link, this.state.tutorName);
    }
    $emailInput.val('');
  }

  sendLink(email, link, tutorName) {
    $.ajax({
      type: 'POST',
      url: '/sendLink',
      data: {
        tutorName: tutorName,
        email: email,
        link: link
      },
      success: function() {
        alert('Message sent.');
      },
      error: function(err) {
        alert('Error: Your email did not send..', err);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>The Dashboard</h1>
        <p>Your private chat room: <a src={ this.state.link }>{ this.state.link }</a></p>
        <div className="ui action input">
          <input id="email-input" type="text" placeholder="Email address" />
          <button className="ui teal button" onClick={this.handleSubmit.bind(this)}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default Dashboard;