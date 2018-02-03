const mongoose = require('mongoose');

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

const Message = mongoose.model('message', messageSchema);

module.exports.saveMessage = (message, cb) => {
  Message.create({
    channelId: message.channelId,
    name: message.name,
    body: message.body
  }, (err, message) => {
    if (err) {
      console.error(err);
    }
    cb(err, message);
  });
};

module.exports.getMessages = (channelId, cb) => {
  Message.find({ channelId: channelId }, (err, messages) => {
    if (err) {
      console.error(err)
    }
    cb(err, messages);
  });
};
