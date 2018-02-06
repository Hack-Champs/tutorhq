import React, { Component } from 'react';
import $ from 'jquery';

class ScreenToggle extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleTimerClick = this.handleTimerClick.bind(this);
    this.handleEndSessionClick = this.handleEndSessionClick.bind(this);
    this.setTime = this.setTime.bind(this);
    this.timer = null;
    this.state = {
      totalSeconds: 0,
      timeString: '',
      timerRunning: false
    };
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
    var timeString = this.getTimeString();
    this.setState({
      timeString: timeString
    });
  }

  getTimeString() {
    var timeString = '';
    var seconds = '';
    var minutes = '';
    var hours = '';
    if (this.state.totalSeconds >= 3600) {
      seconds = this.pad(this.state.totalSeconds % 60);
      minutes = this.pad(parseInt(this.state.totalSeconds / 60));
      hours = this.pad(parseInt(this.state.totalSeconds / 3600));
      timeString = `${hours}.${minutes}.${seconds}`;
    } else if (this.state.totalSeconds >= 60) {
      seconds = this.pad(this.state.totalSeconds % 60);
      minutes = this.pad(parseInt(this.state.totalSeconds / 60));
      timeString = `${minutes}.${seconds}`;
    } else if (this.state.totalSeconds > 0) {
      seconds = this.pad(this.state.totalSeconds % 60);
      timeString = `0.${seconds}`;
    }
    return timeString;
  }

  pad(val) {
    var valString = '' + val;
    if (valString.length < 2) {
      return '0' + valString;
    } else {
      return valString;
    }
  }

  toggleButtons(component) {
    var $chat = $('#chat').removeClass('primary');
    var $whiteboard = $('#whiteboard').removeClass('primary');
    var $editor = $('#editor').removeClass('primary');
    var toggleButton = $('#' + component);
    toggleButton.addClass('primary');
  }

  handleEndSessionClick() {
    this.handleTimerClick();
    this.props.handleEndSession(this.state.totalSeconds);
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
        <button id ="timer" className="ui button basic positive" name="timer" onClick={this.handleTimerClick.bind(this)}>{ this.state.timerRunning ? 'Stop' : 'Start' } Timer <span id="timeString">{ `${this.state.timeString}` }</span></button>
        <button id ="end" className="ui button basic positive negative" name="end" onClick={this.handleEndSessionClick.bind(this)}>End Session</button>
      </div>
    );
  }
}

export default ScreenToggle;