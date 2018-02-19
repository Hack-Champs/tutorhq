const db = require('./models/index.js');

exports.getSubjects = (req, res) => {
  db.Subject.find()
    .then((subjects) => {
      res.json(subjects);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.newSubject = (req, res) => {
  db.Subject.create(req.body)
    .then((subject) => {
      res.status(201).json(subject);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getTutor = (req, res) => {
  db.User.find({ username: req.params.tutor })
    .then((tutor) => {
      res.json(tutor);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.newTutor = (req, res) => {
  db.User.create(req.body)
    .then((tutor) => {
      res.status(201).json(tutor);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updateTutor = (req, res) => {
  db.User.findOneAndUpdate(
    { username: req.params.tutor },
    {
      description: req.body.description,
      $addToSet: { subjects: { $each: req.body.subjects || [] } },
    },
    { new: true }
  )
    .then((tutor) => {
      res.json(tutor);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getTutors = (req, res) => {
  db.User.find()
    .then((tutors) => {
      res.json(tutors);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.deleteBooking = (req, res) => {
  db.Booking.findOneAndUpdate({ _id: req.params.bookingID }, { deleted: true })
    .then(() => {
      res.send('booking deleted');
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.deleteInvoice = (req, res) => {
  db.Invoice.findOneAndUpdate({ _id: req.params.invoiceID }, { deleted: true })
    .then(() => {
      res.send('invoice deleted');
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = exports;
