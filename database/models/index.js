const mongoose = require('mongoose');

let url = process.env.MONGODB_URI || 'mongodb://localhost/tutorhq';
mongoose.connect(url, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const channelSchema = mongoose.Schema({});

const messageSchema = mongoose.Schema({
  channelId: {
    type: String,
    unique: false,
    required: true,
  },
  name: {
    type: String,
    unique: false,
    required: true,
  },
  body: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});

const studentSchema = mongoose.Schema({
  name: { type: String, unique: false, required: true },
  email: { type: String, unique: false, required: true },
  notes: String,
});

const bookingSchema = mongoose.Schema({
  channelId: String,
  userId: String,
  studentId: String,
  studentName: String,
  date: String,
  time: String,
  billableTime: String,
  deleted: { type: Boolean, default: false },
});

const userSchema = mongoose.Schema({
  googleId: String,
  sessionID: String,
  name: String,
  username: String,
  description: String,
  subjects: [String],
  email: String,
  students: [studentSchema],
});

const invoiceSchema = mongoose.Schema({
  name: String,
  email: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  dueDate: String,
  notes: String,
  lineItems: [],
  total: String,
  deleted: { type: Boolean, default: false },
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
const Invoice = mongoose.model('Invoice', invoiceSchema);

db.once('open', function() {
  console.log('Connected to mongo');
});

module.exports.Subject = Subject;
module.exports.Rating = Rating;
module.exports.Booking = Booking;
module.exports.User = User;
module.exports.Student = Student;
module.exports.Channel = Channel;
module.exports.Message = Message;
module.exports.Invoice = Invoice;
