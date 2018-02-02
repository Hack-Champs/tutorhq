const mongoose = require('mongoose');

let url = process.env.MONGODB_URI || 'mongodb://localhost/tutorhq';
mongoose.connect(url, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo');
  // For initial test setup: Add single student to tutor if there aren't any.
  // Student.findOne({}, (err, student) => {
  //   if (!student) {
  //     Student.create({
  //       name: 'Hank',
  //       email: 'hank@theprank.com',
  //       notes: ''
  //     });
  //   } else {
  //     User.findOne({}, (err, user) => {
  //       if (user && !user.students.length) {
  //         user.students.push(student);
  //         user.save();
  //       }
  //     });
  //   }
  // });
});

const bookingSchema = mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  studentName: String,
  date: String,
  time: String,
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
});

const channelSchema = mongoose.Schema({
});

const studentSchema = mongoose.Schema({
  name: { type: String, unique: false, required: true },
  email: { type: String, unique: false, required: true },
  notes: String
});


const userSchema = mongoose.Schema({
  googleId: String,
  sessionID: String,
  name: String,
  username: String,
  description: String,
  subjects: [String],
  tutor: String,
  email: String,
  bookings: [bookingSchema],
  students: [studentSchema]
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
const Student = mongoose.model('Student', studentSchema);
const Channel = mongoose.model('Channel', channelSchema);

module.exports.Subject = Subject;
module.exports.Rating = Rating;
module.exports.Booking = Booking;
module.exports.User = User;
module.exports.Student = Student;
module.exports.Channel = Channel;
