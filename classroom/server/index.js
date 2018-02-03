const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const Message = require('./database/message');
const Channel = require('./database/channel');
const mailer = require('../mailServer/mailer');
const cors = require('cors');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../client/dist`));


let url = process.env.MONGODB_URI || 'mongodb://localhost/classroom';
mongoose.connect(url);
let db = mongoose.connection;

db.on('error', () => {
  console.error('Connection error!');
});

db.once('open', () => {
  console.log('Connected to mongo');
  Channel.makeFirstChannel();
});

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

app.get('*', function (req, res){
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist') });
})

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('client:joinChannel', (channelId, callback) => {
    Channel.getChannel(channelId, (err, channel) => {
      if (err) callback(err);
      if (channel) {
        socket.join(channelId);
        Message.getMessages(channelId, (err, messages)=>{
          callback(err, channel, messages);
        });
      }
    })
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

  socket.on('drawing', (data) => {
    socket.broadcast.to(data.channelId).emit('drawing', data)
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
