const mongoose = require('mongoose');

let url = process.env.MONGODB_URI || 'mongodb://localhost/tutorhq';
mongoose.connect(url, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo');
});


