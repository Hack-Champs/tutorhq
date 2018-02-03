import React, { Component } from 'react';
import Message from './Message.jsx';

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.messages.length) {
      return (
        <div className="container">
          {this.props.messages.map((message) => {
            return <Message message={ message } key={ message._id }/>;
          })}
        </div>
      )
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default Messages;