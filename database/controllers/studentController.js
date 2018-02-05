const db = require('../models/index.js');

createNewStudent = (username, studentInfo, callback) => {
  db.User.findOne({username: username}, (err, user) => {
    if (err) {
      callback(err);
    } else {
      db.Student.create(studentInfo)
        .then((student) => {
          user.students.push(student);
          user.save()
            .then((user) => callback(null, user))
            .catch((err) => callback(err));
        })
        .catch((err) => {
          callback(err);
        });
    }
  });
};

module.exports.createNewStudent = createNewStudent;