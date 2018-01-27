const mongoose = require('mongoose');

let url = process.env.MONGODB_URI || 'mongodb://localhost/tutorhq';
mongoose.connect(url, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo');
});

let bookingSchema = mongoose.Schema({
  name: String,
  date: String,
  time: String
});


//.find({});
let UserSchema = mongoose.Schema({
  googleId: String,
  sessionID: String,
  username: String,
  email: String
});

const User = mongoose.model('User', UserSchema);

const findOrCreate = (query, callback) => {
  console.log('SAVING TO THE DATABASE');
  User.findOne({ googleID: query.googleID }, (err, user) => {
    if (!user) {
      console.log('NEW USER');
      let newUser = new User({
        googleID: query.googleID,
        sessionID: query.sessionID,
        username: query.username,
        email: query.email
      });
      newUser.save(function(err, user) {
        callback(err, user);
      });
    } else {
      console.log('RETURNING USER');
      user.sessionID = query.sessionID;
      user.save(function(err, user) {
        callback(err, user);
      });
    }
  });
};


module.exports.findOrCreate = findOrCreate;