var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${ port }`);
});