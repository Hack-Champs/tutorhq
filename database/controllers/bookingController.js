const db = require('../models/index.js')

const createBooking = (username, bookingInfo, callback) => {
  var booking = new db.Booking({
    student: bookingInfo.student,
    studentName: bookingInfo.student.name,
    date: bookingInfo.date,
    time: bookingInfo.time
  });

  db.User.findOneAndUpdate({ username: username }, { $push: { bookings: booking } }, { new: true }, (err, data) => {
    callback(err, data);
  });
};

const deleteBooking = (username, bookingID, callback) => {
  var newBookings;
  db.User.findOne({ username: username }, (err, user) => {
    newBookings = user.bookings.filter(booking => booking._id.toString() !== bookingID)
  }).then(() => {
    db.User.findOneAndUpdate({ username: username }, { bookings: newBookings }, { new: true }, (err, user) => {
      console.log(user);
      callback(err, user);
    });
  })
};

module.exports.createBooking = createBooking;
module.exports.deleteBooking = deleteBooking;
