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
    db.findOrCreate({ googleId: profile.id, sessionID: req.sessionID, email: profile.emails[0].value, username: username }, function (err, user) {
      return done(err, user);
    });
  }
));

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

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

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(501).send('Could not log out');
    }
    else {
      res.status(200).send('Logged out successfully');
    }
  })
})

module.exports = app;