function BoomServer(io) {
    var self = this;
    self.socketIo = io;
    self.numberOfCurrentClientsConnected = 0;
    self.numberOfClientsConnectedSinceStart = 0;
    
    
    self.connectedDevices = [];
    
    self.socketIo.on('connection', function(socket) {
        self.onClientConnect(socket);
    });
}

var eventTypes = {
    setting : "setting",
    targetData : "targetData",
    clientInfo : "clientInfo"
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
        
        

        socket.emit('testerEvent', { type: eventTypes.targetData, message: value });
        console.log("msg '" + value + "' sent!");
    });
    
    
    
    socket.on('getClientInfo', function(data) { // Data: "type|value"
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
        
        
        
        
        if(type == eventTypes.clientInfo) {
            socket.emit("clientInfoEvent", { type: eventTypes.clientInfo, address: socket.handshake.address, connectedClients: self.connectedDevices, date: value });
            console.log("msg '" + value + "' sent!");
        }
    });
    
    console.log('User connected, number of clients since server start: ' + self.numberOfClientsConnectedSinceStart);
    console.log('User connected now: ' + self.numberOfCurrentClientsConnected);
    
    
    console.log('Test!')
    
    self.connectedDevices[self.connectedDevices.length] = socket.handshake.address;
    console.log(socket.handshake.address);
    
}

BoomServer.prototype.onClientDisconnect = function() {
    var self = this;
    
    self.numberOfCurrentClientsConnected--;
    
    self.socketIo.emit('numberOfClients', self.numberOfCurrentClientsConnected);
    
    console.log('User disconnected, currently connected now: ' + self.numberOfCurrentClientsConnected);
}

module.exports = BoomServer;