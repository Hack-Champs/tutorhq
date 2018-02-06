const mongoose = require('mongoose');

let url = process.env.MONGODB_URI || 'mongodb://localhost/tutorhq';
mongoose.connect(url, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const channelSchema = mongoose.Schema({
});

const messageSchema = mongoose.Schema({
  channelId: {
    type: String,
    unique: false,
    required: true
  },
  name: {
    type: String,
    unique: false,
    required: true
  },
  body: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

const studentSchema = mongoose.Schema({
  name: { type: String, unique: false, required: true },
  email: { type: String, unique: false, required: true },
  notes: String
});

const bookingSchema = mongoose.Schema({
  channelId: String,
  userId: String,
  studentId: String,
  studentName: String,
  date: String,
  time: String,
  billableTime: String
});

const userSchema = mongoose.Schema({
  googleId: String,
  sessionID: String,
  name: String,
  username: String,
  description: String,
  subjects: [String],
  email: String,
  students: [studentSchema]
});

const ratingSchema = mongoose.Schema({
  tutorId: Number,
  rating: Number,
});

const subjectSchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

const Message = mongoose.model('message', messageSchema);
const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Rating = mongoose.model('Rating', ratingSchema);
const Subject = mongoose.model('Subject', subjectSchema);
const Student = mongoose.model('Student', studentSchema);
const Channel = mongoose.model('Channel', channelSchema);

db.once('open', function() {
  console.log('Connected to mongo');
  // For initial test setup: Add single student to tutor if there aren't any.
  User.findOne({}, (err, user) => {
    if (user) {
      Student.findOne({}, (err, student) => {
        if (!student) {
          student = new Student({
            name: 'John',
            email: 'John@gmail.com',
            notes: ''
          });
          student.save((err, student) => {
            user.students.push(student);
            user.save();
          });
        }
      });
    }
  });
});

module.exports.Subject = Subject;
module.exports.Rating = Rating;
module.exports.Booking = Booking;
module.exports.User = User;
module.exports.Student = Student;
module.exports.Channel = Channel;
module.exports.Message = Message;
