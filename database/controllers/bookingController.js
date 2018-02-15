const db = require('../models/index.js');
const Message = require('../../database/controllers/messageController');

const getBookingsForUser = (username, cb) => {
  db.User.findOne({username: username}, (err, user) => {
    if (err) {
      return cb(err);
    } else {
      db.Booking.find({'userId': user.id, deleted: false}, (err, bookings) => {
        cb(null, bookings);
      });
    }
  });
};


const createBooking = (username, bookingInfo, callback) => {
  db.User.findOne({ username: username }, (err, user) => {
    if (err) {
      return callback(err);
    }
    var channel = new db.Channel({});
    channel.save((err, channel) => {
      if (err) {
        return callback(err);
      }
      var booking = new db.Booking({
        channelId: channel.id,
        userId: user.id,
        studentId: bookingInfo.student.id,
        studentName: bookingInfo.student.name,
        date: bookingInfo.date,
        time: bookingInfo.time,
      });
      booking.save((err, booking) => {
        if (err) {
          return callback(err);
        }
        getBookingsForUser(username, callback);
      });
    });
  });
};

const updateWithBillableTime = (bookingId, billableTime, cb) => {
  db.Booking.findById(bookingId, function(err, booking) {
    if (err) {
      return cb(error);
    }
    booking.billableTime = billableTime;
    booking.save(err => {
      cb(err);
    });
  });
};

const getChannelDetails = (channelId, cb) => {
  db.Booking.findOne({ channelId: channelId }, function (err, booking) {
    if (err) {
      return cb(err);
    }
    if (booking) {
      db.User.findById(booking.userId, (err, user) => {
        if (err) {
          return cb(err);
        }
        Message.getMessages(channelId, (err, messages) => {
          cb(null, messages, booking.id, user.id);
        });
      });
    }
  });
};


module.exports.createBooking = createBooking;
module.exports.getBookingsForUser = getBookingsForUser;
module.exports.updateWithBillableTime = updateWithBillableTime;
module.exports.getChannelDetails = getChannelDetails;
