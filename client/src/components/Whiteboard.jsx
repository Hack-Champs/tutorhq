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
    this.onColorUpdate = this.onColorUpdate.bind(this);
  }

  componentDidMount() {
    this.canvas = document.getElementsByClassName('whiteboard')[0];
    this.colors = document.getElementsByClassName('color');
    this.context = this.canvas.getContext('2d');

    this.canvas.addEventListener('mousedown', this.onMouseDown, false);
    this.canvas.addEventListener('mouseup', this.onMouseUp, false);
    this.canvas.addEventListener('mouseout', this.onMouseUp, false);
    this.canvas.addEventListener('mousemove', this.throttle(this.onMouseMove, 10), false);

    for (var i = 0; i < this.colors.length; i++){
      this.colors[i].addEventListener('click', this.onColorUpdate, false);
    }

    this.socket.on('drawing', this.onDrawingEvent);

    window.addEventListener('resize', this.onResize, false);
    this.onResize();
  }

  drawLine(x0, y0, x1, y1, color, emit){
    this.context.beginPath();
    this.context.moveTo(x0, y0 - 100);
    this.context.lineTo(x1, y1 - 100);
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();

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

  onMouseDown(e){
    this.drawing = true;
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  }

  onMouseUp(e){
    if (!this.drawing) { return; }
    this.drawing = false;
    this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
  }

  onMouseMove(e){
    if (!this.drawing) { return; }
    this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  }

  onColorUpdate(e){
    this.current.color = e.target.className.split(' ')[1];
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

  onDrawingEvent(data){
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
      <div className="whiteboardDiv">
        <canvas className="whiteboard" ></canvas>
        <div className="colors">
          <div className="color black"></div>
          <div className="color red"></div>
          <div className="color green"></div>
          <div className="color blue"></div>
          <div className="color yellow"></div>
        </div>
      </div>
    );
  }
}

export default Whiteboard;