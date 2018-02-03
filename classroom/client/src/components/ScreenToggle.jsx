import React, { Component } from 'react';
import $ from 'jquery';

class ScreenToggle extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleTimerClick = this.handleTimerClick.bind(this);
    this.setTime = this.setTime.bind(this);
    this.timer = null;
    this.state = {
      totalSeconds: 0,
      seconds: '',
      minutes: '',
      hours: '',
      timerRunning: false
    }
  }

  handleClick(component) {
    this.toggleButtons(component);
    this.props.handleClick(component);
  }

  handleTimerClick() {
    if (!this.state.timerRunning) {
      this.timer = setInterval(this.setTime, 1000);
    } else {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({timerRunning: !this.state.timerRunning});
  }

  setTime() {
    this.setState({
      totalSeconds: this.state.totalSeconds + 1
    });
    var seconds = this.pad(this.state.totalSeconds % 60);
    var minutes = this.pad(parseInt(this.state.totalSeconds / 60));
    var hours = this.pad(parseInt(this.state.totalSeconds / 3600));
    this.setState({
      seconds: seconds,
      minutes: minutes,
      hours: hours
    });
  }

  pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  toggleButtons(component) {
    var $chat = $('#chat').removeClass('primary');
    var $whiteboard = $('#whiteboard').removeClass('primary');
    var $editor = $('#editor').removeClass('primary');
    var toggleButton = $('#'+component);
    toggleButton.addClass('primary');
  }

  render() {
    return (
      <div className="screenToggle">
        <div className="ui buttons">
          <button id ="chat" className="ui button primary" name="chat" onClick={this.handleClick.bind(this, 'chat')}>Chat</button>
          <div className="or"></div>
          <button id ="whiteboard" className="ui button" name="whiteboard" onClick={this.handleClick.bind(this, 'whiteboard')}>Whiteboard</button>
          <div className="or"></div>
          <button id ="editor" className="ui button" name="editor" onClick={this.handleClick.bind(this, 'editor')}>Editor</button>

        </div>
        <button id ="timer" className="ui button basic mini positive" name="timer" onClick={this.handleTimerClick.bind(this)}>{ this.state.timerRunning ? 'Stop' : 'Start' } Timer</button><span>{ `${this.state.hours}:${this.state.minutes}:${this.state.seconds}` }</span>
      </div>
    );
  }
}

export default ScreenToggle;