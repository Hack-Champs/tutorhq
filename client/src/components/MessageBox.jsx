import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class MessageBox extends Component {
  constructor(props) {
    super(props);
  }

  sendMessage() {
    const $messageBody = $('#message-body');
    var body = $messageBody.val();
    if (body) {
      const socket = this.props.socket;
      socket.emit(`client:createMessage`, {
        channelId: this.props.channelId,
        body: body,
        name: this.props.name,
      });
      $messageBody.val('');
      $messageBody.focus();
    }
  }

  handleKeyPress(e) {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  render() {
    return (
      <div className="messagebox-container">
        <textarea
          id="message-body"
          name="message"
          type="text"
          placeholder="Message"
          onKeyDown={this.handleKeyPress.bind(this)}
          autoFocus
        />
        <button
          id="send-message-btn"
          className="ui button primary"
          onClick={this.sendMessage.bind(this)}
        >
          Send
        </button>
      </div>
    );
  }
}

export default MessageBox;
