const db = require('../models/index.js');

module.exports.saveMessage = (message, cb) => {
  db.Message.create(
    {
      channelId: message.channelId,
      name: message.name,
      body: message.body,
    },
    (err, message) => {
      if (err) {
        console.error(err);
      }
      cb(err, message);
    }
  );
};

module.exports.getMessages = (channelId, cb) => {
  db.Message.find({ channelId: channelId }, (err, messages) => {
    if (err) {
      console.error(err);
    }
    cb(err, messages);
  });
};
