const db = require('../models/index.js');
const Message = require('../../database/controllers/messageController');

const getBookingsForUser = (username, cb) => {
  db.User.findOne({username: username}, (err, user) => {
    if (err) {
      return cb(err);
    } else {
      db.Booking.find({'userId': user.id}, (err, bookings) => {
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

const deleteBooking = (username, bookingID, status, callback) => {
  console.log('deleting/put controller reached');
  db.Booking.findById(bookingID, function (err, booking) {
    if (err) {
      return callback(err);
    } else {
      booking.deleted = status;
      booking.save();
      db.User.findOne({username: username}, (err, user) => {
        if (err) {
          return callback(err);
        } else {
          db.Booking.find({userId: user.id}, (err, bookings) => {
            if (err) {
              return callback(err);
            } else {
              callback(null, bookings);
            }
          });
        }
      });
    }
  });
};

const getChannelDetails = (channelId, cb) => {
  db.Booking.findOne({ channelId: channelId }, function (err, booking) {
    if (err) {
      return cb(err);
    }
    db.User.findById(booking.userId, (err, user) => {
      if (err) {
        return cb(err);
      }
      Message.getMessages(channelId, (err, messages) => {
        cb(null, messages, booking.id, user.id);
      });
    });
  });
};


module.exports.createBooking = createBooking;
module.exports.getBookingsForUser = getBookingsForUser;
module.exports.deleteBooking = deleteBooking;
module.exports.updateWithBillableTime = updateWithBillableTime;
module.exports.getChannelDetails = getChannelDetails;
