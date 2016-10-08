function BoomServer(io) {
    var self = this;
    self.socketIo = io;
    self.numberOfCurrentClientsConnected = 0;
    self.numberOfClientsConnectedSinceStart = 0;
    
    self.socketIo.on('connection', function(socket) {
        self.onClientConnect(socket);
    });
}

var eventTypes = {
    setting : "setting",
    targetData : "targetData"
}

BoomServer.prototype.onClientConnect = function(socket) {
    var self =  this;
    
    self.numberOfCurrentClientsConnected++;
    self.numberOfClientsConnectedSinceStart++;
    
    socket.broadcast.emit('numberOfClients', self.numberOfCurrentClientsConnected);
    socket.emit('numberOfClients', self.numberOfCurrentClientsConnected)
    
    socket.on('disconnect', function() {
        self.onClientDisconnect();
    });
    
    socket.on('clientEvent', function(data) { // Data: "type|value"
        console.log(data);
        
        
        
        var dataVal = data.split('|');
        console.log(dataVal + " - " + dataVal.length);
        if(dataVal.length != 2) {
            console.log("data received is not in correct format!");
            return;
        }
        
        var type = dataVal[0];
        
        if(!eventTypes[type]) {
            console.log("Wrong type received. " + type + " is not defined!");
            return;
        }
        
        var value = dataVal[1];
        
        
        if(type == eventTypes.targetData) {
            // radier.
            var targetValues = value.split('#');

            
            targetValues.forEach(function(item) {
                console.log("targetData received: " +item);
            });
            
        }
        
        

        socket.emit('testerEvent', { message: 'Received: ' + value });
        console.log("msg '" + value + "' sent!");
    });
    
    console.log('User connected, number of clients since server start: ' + self.numberOfClientsConnectedSinceStart);
    console.log('User connected now: ' + self.numberOfCurrentClientsConnected);
}

BoomServer.prototype.onClientDisconnect = function() {
    var self = this;
    
    self.numberOfCurrentClientsConnected--;
    
    self.socketIo.emit('numberOfClients', self.numberOfCurrentClientsConnected);
    
    console.log('User disconnected, currently connected now: ' + self.numberOfCurrentClientsConnected);
}

module.exports = BoomServer;