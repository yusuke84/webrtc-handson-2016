"use strict";

const WebSocketServer = require('ws').Server;
const port = 3001;
const wsServer = new WebSocketServer({ port: port });

wsServer.on('connection', function(ws) {
    console.log('-- websocket connected --');
    ws.on('message', function(message) {
        wsServer.clients.forEach(function each(client) {
            if (isSame(ws, client)) {
                console.log('- skip sender -');
            }
            else {
                client.send(message);
            }
        });
    });
});

function isSame(ws1, ws2) {
    // -- compare object --
    return (ws1 === ws2);
}

console.log('websocket server start. port=' + port);