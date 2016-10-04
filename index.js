var express = require('express')
const config = require('./config.json')

var app = express();

app.get('/', function(req, res) {
    res.send('Hello kuug');
});

app.get('/kug/', function(req, res) {
    res.send('Hello fetta');
});

app.listen(config.port, function() {
    console.log('Server running at: ' + config.ip + ':' + config.port);
});


