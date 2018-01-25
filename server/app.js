var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// test end points
app.get('/test', function(req, res) {
  res.end();
});

module.exports = app;