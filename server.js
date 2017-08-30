var WebSocketServer = require('ws').Server;
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer();

app.use(express.static(path.join(__dirname, '/public')));

var wss = new WebSocketServer({server: server});

wss.on('connection', function (ws) {
  console.log('connection');

  ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      if(message == 'next-command') {
        ws.send("open-tab");
      }
    });

  ws.on('close', function () {
    console.log('stopping');
  });
});

server.on('request', app);

app.get('/open-tab', function (req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(8080, function () {
  console.log('Listening on http://localhost:8080');
});
