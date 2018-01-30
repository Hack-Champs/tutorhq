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
  time: String,
});

let sessionSchema = mongoose.Schema({
  email: String,
  sessions: [bookingSchema]
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

const subjectSchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

const User = mongoose.model('User', UserSchema);

const Session = mongoose.model('Session', sessionSchema);

const Booking = mongoose.model('Booking', bookingSchema);

const Rating = mongoose.model('Rating', ratingSchema);

const Subject = mongoose.model('Subject', subjectSchema);

const createBooking = (email, query, callback) => {
  Session.findOne({ email: email }, (err, user) => {
    if (user) {
      var booking = new Booking({
        name: query.name,
        date: query.date,
        time: query.time,
      });
      var newBooking = user.sessions.concat([booking]);
      user.sessions = newBooking;
      user.save(function(err, user) {
        callback(err, user.sessions);
      });

    }
  });

  book.save(function(err, booking) {
    callback(err, booking);
  });
};

const findOrCreate = (query, callback) => {
  User.findOne({ googleId: query.googleId }, (err, user) => {
    if (!user) {
      console.log('NEW USER');
      let newUser = new User({
        googleId: query.googleId,
        sessionID: query.sessionID,
        username: query.username,
        email: query.email,
        description: query.description,
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

const logout = (sessionID, callback) => {
  User.update({ sessionID: sessionID }, { $set: { sessionID: ''}}, callback);
};

module.exports.createBooking = createBooking;
module.exports.logout = logout;
module.exports.findOrCreate = findOrCreate;
module.exports.Subject = Subject;
module.exports.Rating = Rating;
module.exports.Booking = Booking;
module.exports.User = User;
