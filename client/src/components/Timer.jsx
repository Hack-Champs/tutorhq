import React, { Component } from 'react';
import $ from 'jquery';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.handleTimerClick = this.handleTimerClick.bind(this);
    this.handleEndSessionClick = this.handleEndSessionClick.bind(this);
    this.setTime = this.setTime.bind(this);
    this.timer = null;
    this.state = {
      totalSeconds: 0,
      timeString: '0.00',
      timerRunning: false
    };
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

  handleEndSessionClick() {
    this.handleTimerClick();
    this.props.handleEndSession(this.state.totalSeconds);
  }

  render() {
    var controls = '';

    if (this.props.isTutor) {
      controls = (
        <span>
          <button id ="timer" className="ui labeled icon button primary" onClick={this.handleTimerClick.bind(this)}>
            { this.state.timerRunning ? <i className="pause icon"></i> : <i className="play icon"></i> }
            { `${this.state.timeString}` }
          </button>
          <button id ="end" className="ui labeled icon red button" name="end" onClick={this.handleEndSessionClick.bind(this)}>
            <i className="stop icon"></i>
            End Session</button>
        </span>
      );
    }
    return (
      <div>
        {controls}
      </div>
    );
  }
}

export default Timer;