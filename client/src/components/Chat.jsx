import React, { Component } from 'react';
import Messages from './Messages.jsx';
import MessageBox from './MessageBox.jsx';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mainWrapper chatDiv">
        <div className="chat">
          <div className="messages" ref="messages">
            <Messages
              messages={this.props.messages}
            />
          </div>
          <MessageBox
            socket ={this.props.socket}
            channelId={this.props.channelId}
            name={this.props.name}
          />
        </div>
      </div>
    );
  }
}

export default Chat;

