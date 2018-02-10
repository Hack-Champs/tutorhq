import React, { Component } from 'react';
import Messages from './Messages.jsx';
import MessageBox from './MessageBox.jsx';
import Editor from './Editor.jsx';
import Whiteboard from './Whiteboard.jsx';
import Timer from './Timer.jsx';
import io from 'socket.io-client';
import qs from 'qs';
import $ from 'jquery';
import SimpleWebRTC from 'simplewebrtc';
import { Dropdown, Grid, Button, Container, Input, Segment } from 'semantic-ui-react';

class Workspace extends Component {
  constructor(props) {
    super(props);
    // const port = process.env.PORT || '3000' or window.location.hostname || 'https://tutorhq.herokuapp.com/' localhost:3000;
    this.socket = io.connect('https://tutorhq.herokuapp.com/');
    this.handleEndSession = this.handleEndSession.bind(this);
    this.startVideo = this.startVideo.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);

    this.webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      remoteVideosEl: 'remoteVideos',
      autoRequestMedia: true,
    });

    this.state = {
      channelId: '',
      billingId: '',
      bookingId: '',
      userId: '',
      name: '',
      isTutor: false,
      messages: [],
      videoPaused: false,
      muted: false,
      isPlaying: false
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
      var context = this;
      context.setState({
        messages: context.state.messages.concat([data])
      }, () => {
        context.scrollToLastMessage();
      });
      console.log('Message received from server and added to state', data);
    });
  }

  joinChannel(channelId) {
    var context = this;
    if (channelId) {
      this.socket.emit('client:joinChannel', channelId, (err, messages, bookingId, userId)=>{
        console.log('Join channel');
        if (!err) {
          context.setState({userId: userId, channelId: channelId, bookingId: bookingId, messages: messages}, () => {
            context.scrollToLastMessage();
          });
        } else {
          alert('Unknown channel id. Please check that you have the correct url');
          this.socket.disconnect();
        }
      });
    }
  }

  scrollToLastMessage() {
    $('#messages').scrollTop($('#messages').prop('scrollHeight') - $('#messages').height());
  }

  getName() {
    var name = prompt('What is your name?');
    if (name) {
      this.setState({name: name});
    } else {
      this.getName();
    }
  }

  handleEndSession(totalSeconds) {
    this.socket.emit('client:endSession', this.state.bookingId, totalSeconds, (err) => {
      if (err) {
        console.log('Error when ending session');
      }
    });
    close();
  }

  startVideo() {
    var context = this;
    if (this.state.channelId !== '' && !this.state.isPlaying) {
      this.webrtc.on('readyToCall', function () {
        context.webrtc.joinRoom(context.state.channelId);
        context.setState({isPlaying: true});
      });
    }
  }

  toggleVideo() {
    if (this.state.videoPaused) {
      this.webrtc.resume();
    } else {
      this.webrtc.pause();
    }
    this.setState({videoPaused: !this.state.videoPaused});
  }

  toggleAudio() {
    if (this.state.muted) {
      this.webrtc.unmute();
    } else {
      this.webrtc.mute();
    }
    this.setState({muted: !this.state.muted});
  }

  render() {
    var videoBtnText = this.state.videoPaused ? 'Video' : 'No Video';
    var audioBtnText = this.state.muted ? 'Unmute' : 'Mute';
    this.startVideo();
    return (
      <Grid celled padded style={{height: '100vh', 'backgroundColor': '#4682B4'}}>
        <Grid.Row style={{height: '100%'}}>
          <Grid.Column width={11}>
            <Grid.Row style={{height: '65%', 'backgroundColor': 'white'}}>
              <Whiteboard
                socket={this.socket}
                channelId={this.state.channelId}
              />
            </Grid.Row>
            <Grid.Row style={{height: '34%'}}>
              <Grid celled style={{height: '100%'}}>
                <Grid.Row style={{height: '70%'}}>
                  <Grid.Column width={10} style={{'backgroundColor': 'white', 'padding': '5px'}}>
                    <Messages
                      messages={this.state.messages}
                    />
                  </Grid.Column>
                  <Grid.Column width={3} style={{'backgroundColor': 'white'}}>
                    <div>
                      <video id="localVideo"></video>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={3} style={{'backgroundColor': 'white'}}>
                    <div id="remoteVideos"></div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{height: '30%'}}>
                  <Grid.Column width={10} style={{'backgroundColor': 'white'}}>
                    <MessageBox
                      socket ={this.socket}
                      channelId={this.state.channelId}
                      name={this.state.name}
                    />
                  </Grid.Column>
                  <Grid.Column width={6} style={{'backgroundColor': 'white'}}>
                    <Timer
                      handleEndSession={this.handleEndSession}
                      isTutor={this.state.isTutor}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={5} style={{'backgroundColor': '#4682B4'}}>
            <Editor
              socket={this.socket}
              channelId={this.state.channelId}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Workspace;
