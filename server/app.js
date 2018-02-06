var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportConfig = require('./config/passport-config');
var db = require('../database/models/index.js');
var authCtrl = require('../database/controllers/authController.js');
var studentCtrl = require('../database/controllers/studentController.js');
var bookingCtrl = require('../database/controllers/bookingController.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// test end points
app.get('/test', function(req, res) {
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
app.delete('/users/:username/booking/:bookingID', (req, res) => {
  var username = req.user.username;
  var bookingID = req.params.bookingID;
  bookingCtrl.deleteBooking(username, bookingID, (err, bookings) => {
    if (err) {
      res.status(501).send('Could not delete that booking');
    } else {
      res.send(bookings);
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

module.exports = app;
