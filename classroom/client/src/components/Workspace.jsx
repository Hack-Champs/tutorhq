import React, { Component } from 'react';
import Chat from './Chat.jsx';
import Editor from './Editor.jsx';
import Whiteboard from './Whiteboard.jsx';
import ScreenToggle from './ScreenToggle.jsx';
import Video from './Video.jsx';
import axios from 'axios';
import io from 'socket.io-client';
import qs from 'qs';

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(`http://localhost:8000`);
    this.handleClick = this.handleClick.bind(this);
    this.handleEndSession = this.handleEndSession.bind(this);
    this.state = {
      channelId: '',
      billingId: '',
      bookingId: '',
      userId: '',
      name: '',
      isTutor: false,
      messages: [],
      togglableComponent: 'chat'
    };
  }

  componentDidMount() {
    const channelId = this.props.match.params.id;
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    const tutorName = query.tutor;
    if (tutorName) {
      this.setState({name: tutorName, isTutor: true});
    } else {
      if (!this.state.name.length) {
        this.getName();
      }
    }
    var context = this;
    this.socket.on('connect', () => {
      console.log('Socket io connected');
      context.joinChannel(channelId);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from io server');
    });

    this.socket.on(`server:newMessage`, data => {
      context.setState({
        messages: context.state.messages.concat([data])
      });
      console.log('Message received from server and added to state', data);
    });
  }

  joinChannel(channelId) {
    var context = this;
    if (channelId) {
      this.socket.emit('client:joinChannel', channelId, (err, messages, bookingId, userId)=>{
        if (!err) {
          context.setState({userId: userId, channelId: channelId, bookingId: bookingId, messages: messages});
        } else {
          alert('Unknown channel id. Please check that you have the correct url');
          this.socket.disconnect();
        }
      });
    }
  }

  getName() {
    var name = prompt('What is your name?');
    if (name) {
      this.setState({name: name});
    } else {
      this.getName();
    }
  }

  handleClick(screen) {
    this.setState({togglableComponent: screen});
  }

  handleEndSession(totalSeconds) {
    this.socket.emit('client:endSession', this.state.bookingId, totalSeconds, (err) => {
      if (err) {
        console.log('Error when ending session');
      }
    });
    close();
  }

  render() {
    let togglableComponent;
    if (this.state.togglableComponent === 'chat') {
      togglableComponent = (
        <Chat
          socket={this.socket}
          messages={this.state.messages}
          channelId={this.state.channelId}
          name={this.state.name}
        />
      );
    } else if (this.state.togglableComponent === 'whiteboard') {
      togglableComponent = (
        <Whiteboard
          socket={this.socket}
          channelId={this.state.channelId}
        />
      );
    } else if (this.state.togglableComponent === 'editor') {
      togglableComponent = (
        <Editor
          socket={this.socket}
          channelId={this.state.channelId}
        />
      );
    }
    return (
      <div className="workspaceDiv">
        <div className="ui two column">
          <div className="column">
            <ScreenToggle
              handleClick={this.handleClick}
              handleEndSession={this.handleEndSession}
              isTutor={this.state.isTutor}
            />
            {togglableComponent}
          </div>
          <div className="right aligned column">
            <Video
              channelId={this.state.channelId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Workspace;



