var http = require('http');
var socketIO = require('socket.io');
var app = require('./app');
var bookingCtrl = require('../database/controllers/bookingController.js');
var messageCtrl = require('../database/controllers/messageController.js');

var port = process.env.PORT || 3000;
var server = http.Server(app);
var io = socketIO(server);
server.listen(port);

app.get('*', function(req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist') });
});

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('client:joinChannel', (channelId, callback) => {
    bookingCtrl.getChannelDetails(
      channelId,
      (err, messages, bookingId, userId) => {
        if (err) {
          return callback(err);
        } else {
          socket.join(channelId);
          callback(err, messages, bookingId, userId);
        }
      }
    );
  });

  socket.on('client:createMessage', (message, callback) => {
    var message = {
      channelId: message.channelId,
      body: message.body,
      name: message.name,
    };
    messageCtrl.saveMessage(message, (err, savedMessage) => {
      if (err) {
        console.error('Error saving message', err);
      } else {
        io.to(message.channelId).emit('server:newMessage', savedMessage);
      }
    });
  });

  socket.on('client:endSession', (bookingId, billableTime, callback) => {
    bookingCtrl.updateWithBillableTime(bookingId, billableTime, (err) => {
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
