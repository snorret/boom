var http = require('http');
const config = require('./config.json')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end('["helloo kugen"]');
}).listen(config.port, config.ip);
console.log('Server running at: ' + config.ip + ':' + config.port);

