var express = require('express')
const config = require('./config.json')

var app = express();

app.use(express.static('client'))

app.get('/kug/', function(req, res) {
    res.send('Hello feddaah!');
});

app.listen(config.port, function() {
    console.log('Server running at: ' + config.ip + ':' + config.port);
});


