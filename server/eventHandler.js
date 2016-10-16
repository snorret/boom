var eventTypes = {
    setting : "setting",
    targetData : "targetData",
    clientInfo : "clientInfo"
}

module.exports = {
    handleEvent: function(socket, event) {
        if(!socket || !event){
            console.log("Error when receiving event data.");
            return;
        }
        
        var eventSplit = event.split('|');
        console.log(eventSplit + " - " + eventSplit.length);
        if(eventSplit.length != 2) {
            console.log("data received is not in correct format!");
            return;
        }
        
        var eventType = eventSplit[0];
        
        if(!eventTypes[eventType]) {
            console.log("Wrong type received. " + eventType + " is not defined!");
            return;
        }
        
        var eventData = eventSplit[1];
        
        
        switch (eventType) {
            case eventTypes.setting:
                handleSettings(socket, eventData);
                break;
            case eventTypes.targetData:
                handleTargetData(socket, eventData);
                break;
            case eventTypes.clientInfo:
                handleClientInfo(socket, eventData);
        }
    }
};


handleSettings = function(socket, evt) {
    
};

handleTargetData = function(socket, evt) {
    

    var targetValues = evt.split('#');

    targetValues.forEach(function(item) {
        console.log("targetData received: " +item);
    });
        
        

    socket.emit('testerEvent', { type: eventTypes.targetData, message: evt });
    console.log("msg '" + evt + "' sent!");
    
    
    
};

handleClientInfo = function(socket, evt) {
    socket.emit("clientInfoEvent", { type: eventTypes.clientInfo, address: socket.handshake.address, /*connectedClients: self.connectedDevices,*/ date: evt });
    console.log("msg '" + evt + "' sent!");
};