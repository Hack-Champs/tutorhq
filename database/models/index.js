const mongoose = require('mongoose');

let url = process.env.MONGODB_URI || 'mongodb://localhost/tutorhq';
mongoose.connect(url, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo');
});

const bookingSchema = mongoose.Schema({
  name: String,
  date: String,
  time: String,
});

const userSchema = mongoose.Schema({
  googleId: String,
  sessionID: String,
  username: String,
  description: String,
  subjects: [String],
  tutor: String,
  email: String,
  bookings: [bookingSchema]
});

const ratingSchema = mongoose.Schema({
  tutorId: Number,
  rating: Number,
});

const subjectSchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Rating = mongoose.model('Rating', ratingSchema);
const Subject = mongoose.model('Subject', subjectSchema);

module.exports.Subject = Subject;
module.exports.Rating = Rating;
module.exports.Booking = Booking;
module.exports.User = User;
