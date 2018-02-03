import React, { Component } from 'react';

class Video extends Component {
  constructor(props) {
    super(props);
    this.webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remoteVideos',
        autoRequestMedia: true
      });
    this.startVideo = this.startVideo.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.state = {
      videoPaused: false,
      muted: false,
      isPlaying: false
    }
  }

  startVideo() {
    var context = this;
    if (this.props.channelId !== "" && !this.state.isPlaying) {
      this.webrtc.on('readyToCall', function () {
        context.webrtc.joinRoom(context.props.channelId);
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
    this.setState({videoPaused: !this.state.videoPaused})
  }

  toggleAudio() {
    if (this.state.muted) {
      this.webrtc.unmute();
    } else {
      this.webrtc.mute();
    }
    this.setState({muted: !this.state.muted})
  }

  render() {
    var videoBtnText = this.state.videoPaused ? 'Start Video' : 'Stop Video';
    var audioBtnText = this.state.muted ? 'Start Audio' : 'Stop Audio';
    this.startVideo();
    return (
      <div className="videoDiv">
        <div>
          <video id="localVideo"></video>
        </div>
        <div className="right">
          <button className="ui grey basic mini button" onClick={this.toggleVideo.bind(this)}>{videoBtnText}</button>
          <button className="ui grey basic mini button" onClick={this.toggleAudio.bind(this)}>{audioBtnText}</button>
        </div>
        <div id="remoteVideos"></div>
      </div>
    );
  }
}

export default Video;