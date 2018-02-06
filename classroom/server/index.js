const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const Booking = require('../../database/controllers/bookingController');
const Message = require('../../database/controllers/messageController');
const mailer = require('../../mailServer/mailer');
const cors = require('cors');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../client/dist`));

app.post('/sendLink', (req, res) => {
  var tutorName = req.body.tutorName;
  var email = req.body.email;
  var link = req.body.link;
  if (email) {
    mailer.sendLink(tutorName, email, link);
    console.log('Sending', tutorName, email, link);
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.get('*', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist') });
});

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('client:joinChannel', (channelId, callback) => {
    Booking.getChannelDetails(channelId, (err, messages, bookingId, userId) => {
      if (err) {
        return callback(err);
      } else {
        socket.join(channelId);
        callback(err, messages, bookingId, userId);
      }
    });
  });

  socket.on('client:createMessage', (message, callback) => {
    var message = {
      channelId: message.channelId,
      body: message.body,
      name: message.name
    };
    Message.saveMessage(message, (err, savedMessage) => {
      if (err) {
        console.error('Error saving message', err);
      } else {
        io.to(message.channelId).emit('server:newMessage', savedMessage);
      }
    });
  });

  socket.on('client:endSession', (bookingId, billableTime, callback) => {
    Booking.updateWithBillableTime(bookingId, billableTime, (err) => {
      if (err) {
        console.error('Error updating booking', err);
      }
    });
  });

  socket.on('drawing', (data) => {
    socket.broadcast.to(data.channelId).emit('drawing', data);
  });

  socket.on('client:updateCode', (data) => {
    socket.broadcast.to(data.channelId).emit('server:newCode', data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnecting');
  });
});



const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
