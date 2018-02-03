import React, { Component } from 'react';

const Message = (props) => (
  <div className="row message_row">
    <span className='message_name'>{props.message.name}</span> <span className='message_body'>{props.message.body}</span>
  </div>
);

export default Message;