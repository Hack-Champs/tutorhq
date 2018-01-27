var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var db = require('../database/index.js');
var session = require('express-session');

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
  callbackURL: process.env.URL + '/auth/google/redirect',
  passReqToCallback: true
}), (req, accessToken, refreshToken, profile, done) => {
  //passport callback function
  db.findOrCreate({ googleId: profile.id, sessionID: req.sessionID, username: profile.email }, function (err, user) {
    return done(err, user);
  })

})

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

app.get('auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = app;