const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
    tutorId: {
      type: String,
      unique: false,
      required: true
    }
});

const Channel = mongoose.model('channel', channelSchema);

module.exports.getChannel = (id, cb) => {
  Channel.findById(id, function (err, channel){
    if (err) {
      console.error(err)
    }
    cb(err, channel);
  });
};

module.exports.makeFirstChannel = () => {
  Channel.find({}, (err, channels) => {
    if (channels && !channels[0]) {
      Channel.create({
        tutorId: '1234'
      });
    }
  });
};