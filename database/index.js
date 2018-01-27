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
  description: String,
  subjects: [String],
  tutor: String,
  email: String
});

//way to update the subject (PUT)
//GET to return info of the specific tutor based on username
//GET all tutors

let ratingSchema = mongoose.Schema({
  tutorId: Number,
  rating: Number,
});

//sum of ratings divided by the number of records
//average rating

const User = mongoose.model('User', UserSchema);

const Booking = mongoose.model('Booking', bookingSchema);

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