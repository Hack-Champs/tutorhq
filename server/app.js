var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var db = require('../database/index.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((_id, done) => {
  db.User.findById(_id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/redirect',
  passReqToCallback: true
},
  (req, accessToken, refreshToken, profile, done) => {
    console.log('THIS IS THE PROFILE: ', profile);
    const username=profile.emails[0].value.slice(0, profile.emails[0].value.indexOf('@'))
    db.findOrCreate({ googleId: profile.id, sessionID: req.sessionID, name: profile.displayName, email: profile.emails[0].value, username: username, description: '' }, function (err, user) {
      return done(err, user);
    });
  }
));

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// test end points
app.get('/test', function(req, res) {
  res.end();
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: `mongodb://localhost/tutorhq`})
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
      res.send({isSignedin: true, sessionID: req.sessionID})
    } else {
      res.status(404).send(err);
    }
  });
});

app.get('/logout', (req, res) => {
  db.logout(req.sessionID, (err) => {
    if (err) {
      res.status(501).send('Could not log out');
    } else {
      res.status(200).send(false);
    }
  });
});


//POST A NEW SESSION BOOKING
app.post('/users/:email/booking', (req, res) => {
  var email = req.params.email;
  var query = req.body;
  db.createBooking(email, query, (err, sessions) => {
    if (err) {
      res.status(501).send('Could not create a booking');
    } else {
      res.send(sessions);
    }
  });
});

//GET ALL BOOKED SESSIONS
app.get('/users/:email/bookings', (req, res) => {
  var email = req.params.email;
  db.Session.find({email: email}, (err, user) => {
    if (err) {
      res.status(501).send('Could not retrieve bookings');
    } else {
      res.send(user.sessions);
    }
  });
});

//DELETE A SESSION
app.delete('/users/:email/booking/:bookingId', (req, res) => {
  var email = req.params.email;
  var bookingId = req.params.bookingId;
  db.deleteBooking(email, booking, (err, sessions) => {
    if (err) {
      res.status(501).send('Could not delete that booking');
    } else {
      res.send(sessions);
    }
  });
});
module.exports = app;
