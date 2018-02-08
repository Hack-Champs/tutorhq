/*global console*/
var yetify = require('yetify');
var config = require('getconfig');
var fs = require('fs');
var sockets = require('./sockets');
var port = parseInt(process.env.PORT || config.server.port, 10);

var serverHandler = function (req, res) {
  res.writeHead(404);
  res.end();
};
var server = null;

if (config.server.secure) {
  server = require('https').Server({}, serverHandler);
} else {
  server = require('http').Server(serverHandler);
}
server.listen(port);
sockets(server, config);

if (config.uid) {
  process.setuid(config.uid);
}

var httpUrl;
if (config.server.secure) {
  httpUrl = 'https://localhost:' + port;
} else {
  httpUrl = 'http://localhost:' + port;
}
console.log(yetify.logo() + ' -- signal master is running at: ' + httpUrl);