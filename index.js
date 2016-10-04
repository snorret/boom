const config = require('./config.json')

var express = require('express')
var http = require('http');
var socketIo = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIo(server);

app.use(express.static('client'))

app.get('/kug/', function(req, res) {
    res.send('Hello feddaah!');
});

var numberOfConnects = 0;
io.on('connection', function(socket) {
    console.log('User connected, number of connects since server started: ' + ++numberOfConnects);
});

server.listen(config.port, function() {
    console.log('Server running at: ' + config.ip + ':' + config.port);
});


