const db = require('../models/index.js');

const createBooking = (username, bookingInfo, callback) => {
  var channel = new db.Channel({});
  channel.save((err, channel) => {
    if (err) {
      return callback(err);
    }
    var booking = new db.Booking({
      student: bookingInfo.student,
      studentName: bookingInfo.student.name,
      date: bookingInfo.date,
      time: bookingInfo.time,
      channel: channel
    });
    booking.save((err, booking) => {
      if (err) {
        return callback(err);
      }
      db.User.findOneAndUpdate({ username: username }, { $push: { bookings: booking } }, { new: true }, (err, data) => {
        callback(err, data);
      });
    });
  });
};

const getBookingFromChannelId = (channelId, cb) => {
  db.Booking.findOne({ channel: channelId }, function (err, booking) {
    if (err) {
      console.error(err);
    }
    cb(err, booking);
  });
};

const deleteBooking = (username, bookingID, callback) => {
  var newBookings;
  db.User.findOne({ username: username }, (err, user) => {
    // TODO: Delete channel
    newBookings = user.bookings.filter(booking => booking._id.toString() !== bookingID);
  }).then(() => {
    db.User.findOneAndUpdate({ username: username }, { bookings: newBookings }, { new: true }, (err, user) => {
      console.log(user);
      callback(err, user);
    });
  });
};

module.exports.createBooking = createBooking;
module.exports.deleteBooking = deleteBooking;
module.exports.getBookingFromChannelId = getBookingFromChannelId;
