const db = require('../models/index.js')

const findOrCreate = (query, callback) => {
  db.User.findOne({ googleId: query.googleId }, (err, user) => {
    if (!user) {
      console.log('NEW USER');
      let newUser = new db.User({
        googleId: query.googleId,
        sessionID: query.sessionID,
        name: query.name,
        username: query.username,
        email: query.email,
        description: query.description,
      });

      newUser.save(function(err, user) {
        callback(err, user);
      });
    } else {
      console.log('RETURNING USER');
      user.sessionID = query.sessionID;
      user.save(function(err, user) {
        callback(err, user);
      });
    }
  });
};

const logout = (sessionID, callback) => {
  db.User.update({ sessionID: sessionID }, { $set: { sessionID: ''}}, callback);
};

module.exports.findOrCreate = findOrCreate;
module.exports.logout = logout;
