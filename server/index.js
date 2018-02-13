var http = require('http');
var path = require('path');
var express = require('express');
var cors = require('cors');
var socketIO = require('socket.io');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportConfig = require('./config/passport-config');
var db = require('../database/models/index.js');
var authCtrl = require('../database/controllers/authController.js');
var studentCtrl = require('../database/controllers/studentController.js');
var bookingCtrl = require('../database/controllers/bookingController.js');
var messageCtrl = require('../database/controllers/messageController.js');
var invoiceCtrl = require('../database/controllers/invoiceController.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes');

var port = process.env.PORT || 3000;
var app = express();
var server = http.Server(app);
var io = socketIO(server);
server.listen(port);

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

// test end points
app.get('/test', function (req, res) {
  res.end();
});

let url = process.env.MONGODB_URI || 'mongodb://localhost/tutorhq';
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: url})
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/user', (req, res) => {
  res.send(req.user);
});

app.get('/session', (req, res) => {
  db.User.findOne({ sessionID: req.sessionID}, (err, user) => {
    if (user) {
      res.send({isSignedin: true, sessionID: req.sessionID});
    } else {
      res.status(404).send(err);
    }
  });
});

app.get('/logout', (req, res) => {
  authCtrl.logout(req.sessionID, (err) => {
    if (err) {
      res.status(501).send('Could not log out');
    } else {
      res.status(200).send(false);
    }
  });
});

// Return list of tutor's current bookings
app.get('/users/:username/bookings', (req, res) => {
  console.log('get all bookings endpoint');
  // var username = req.params.username;
  var username = req.user.username;
  bookingCtrl.getBookingsForUser(username, (err, bookings) => {
    if (err) {
      res.status(501).send('Could not get bookings');
    } else {
      res.send(bookings);
    }
  });
});

// Return list of tutor's bookings grouped by students
app.get('/users/studentbookings', (req, res) => {
  console.log('get all bookings grouped endpoint');
  // var username = req.params.username;
  var username = req.user.username;
  db.User.findOne({username: username}, (err, user) => {
    if (err) {
      res.status(501).send();
    } else {
      bookingCtrl.getBookingsForUser(username, (err, bookings) => {

        if (err) {
          res.status(501).send('Could not get bookings');
        } else {
          var studentBookings = {};
          bookings.forEach((booking) => {
            if (studentBookings[booking.studentName]) {
              studentBookings[booking.studentName].sessions.push(booking);
            } else {
              user.students.forEach((student) => {
                if (student.name === booking.studentName) {
                  studentBookings[booking.studentName] = {sessions: [booking],
                    email: student.email,
                    notes: student.notes
                  };
                }
              });
            }
          });
          var studentList = [];
          for (var name in studentBookings) {
            var obj = {};
            obj[name] = studentBookings[name];
            studentList.push(obj);
          }
          res.send(studentList);
        }
      });
    }

  });
});

// Add new booking to tutor's profile
app.post('/users/:username/booking', (req, res) => {
  var username = req.user.username;
  var bookingInfo = req.body;
  bookingCtrl.createBooking(username, bookingInfo, (err, bookings) => {
    if (err) {
      res.status(501).send('Could not create a booking');
    } else {
      res.send(bookings);
    }
  });
});

// Delete booking from tutor's profile
app.put('/users/:username/booking/:bookingID', (req, res) => {
  var username = req.user.username;
  var bookingID = req.params.bookingID;
  var status = req.body.deleted;
  bookingCtrl.deleteBooking(username, bookingID, status, (err, bookings) => {
    if (err) {
      res.status(501).send('Could not delete that booking');
    } else {
      let activeBookings = [];
      bookings.forEach((booking) => {
        if (!booking.deleted) {
          activeBookings.push(booking);
        }
      });
      res.send(activeBookings);
    }
  });
});

app.get('/users/:username/students', (req, res) => {
  var username = req.user.username;
  db.User.findOne({username: username}, (err, user) => {
    if (err) {
      res.status(501).send('Could not retrieve students');
    } else {
      res.send(user.students);
    }
  });
});

app.post('/users/:username/students', (req, res) => {
  console.log('create a new student endpoint');
  var username = req.user.username;
  var student = req.body;
  studentCtrl.createNewStudent(username, student, (err, user) => {
    if (err) {
      res.status(501).send('Could not create the student');
    } else {
      res.send(user);
    }
  });
});

app.get('/users/:username/invoices', (req, res) => {
  invoiceCtrl.getInvoices((err, data) => {
    if (err) {
      res.send('Error getting invoice data');
    } else {
      res.send(data);
    }
  })
})

app.post('/users/:username/invoices', (req, res) => {
  var username = req.user.username;
  var newInvoice = req.body;
  console.log(username);
  console.log(newInvoice);
  invoiceCtrl.saveInvoice(newInvoice, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  })
});

app.get('/joinChannel', (req, res) => {
  var channelId = req.body.channelId;
  bookingCtrl.getChannelDetails(channelId, (err, messages, bookingId, userId) => {
    if (err) {
      res.status(501).send('Could not retrieve channel info');
    } else {
      res.send({messages: messages, bookingId: bookingId, userId: userId});
    }
  });
});

app.get('*', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist') });
});

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('client:joinChannel', (channelId, callback) => {
    bookingCtrl.getChannelDetails(channelId, (err, messages, bookingId, userId) => {
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
