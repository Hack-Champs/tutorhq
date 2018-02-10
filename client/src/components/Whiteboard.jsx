import React, { Component } from 'react';

class Whiteboard extends Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
    this.current = {
      color: 'black'
    };
    this.drawing = false;
    this.drawLine = this.drawLine.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.throttle = this.throttle.bind(this);
    this.onDrawingEvent = this.onDrawingEvent.bind(this);
    this.onResize = this.onResize.bind(this);
    this.canvas;
  }

  componentDidMount() {
    this.canvas = document.getElementsByClassName('whiteboard')[0];

    this.canvas.addEventListener('mousedown', this.onMouseDown, false);
    this.canvas.addEventListener('mouseup', this.onMouseUp, false);
    this.canvas.addEventListener('mouseout', this.onMouseUp, false);
    this.canvas.addEventListener('mousemove', this.throttle(this.onMouseMove, 10), false);

    this.socket.on('drawing', this.onDrawingEvent);

    window.addEventListener('resize', this.onResize, false);
    this.onResize();
  }

  drawLine(x0, y0, x1, y1, color, emit) {
    var context = this.canvas.getContext('2d');
    context.beginPath();
    context.moveTo(x0 - 12, y0 - 12);
    context.lineTo(x1 - 12, y1 - 12);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = this.canvas.width;
    var h = this.canvas.height;

    this.socket.emit('drawing', {
      channelId: this.props.channelId,
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }

  onMouseDown(e) {
    this.drawing = true;
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  }

  onMouseUp(e) {
    if (!this.drawing) { return; }
    this.drawing = false;
    this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
  }

  onMouseMove(e) {
    if (!this.drawing) { return; }
    this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  }

  throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  onDrawingEvent(data) {
    var w = this.canvas.width;
    var h = this.canvas.height;
    this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  render() {
    return (
      <div>
        <canvas className="whiteboard" ></canvas>
      </div>
    );
  }
}

export default Whiteboard;