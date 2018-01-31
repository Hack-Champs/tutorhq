var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var db = require('../../database/models/index.js');
var authCtrl = require('../../database/controllers/authController.js');

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
    authCtrl.findOrCreate({ googleId: profile.id, sessionID: req.sessionID, email: profile.emails[0].value, username: username, description: '' }, function (err, user) {
      return done(err, user);
    });
  }
));
