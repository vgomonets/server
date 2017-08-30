var express = require('express');
var app = express();
var path = require('path');
var expressWs = require('express-ws')(app);

app.use(express.static(path.join(__dirname, '/public')));

app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
});

app.get('/open-tab', function (req, res, next) {
    console.log('get route', req.testing);
    res.sendfile(__dirname + '/public/index.html');
});

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
    });
    console.log('socket', req.testing);
});

app.listen(3000);