var fs = require('fs');
const WebSocket = require('ws');
var message = require('./message.json');
// {data: message.data}
var messageData = JSON.stringify(message);
// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 7000
});


wss.on('connection', function (ws) {
  console.log(`[SERVER] connection()`);
  
  ws.send(messageData, (err) => {
      if (err) {
          console.log(`[SERVER] error: ${err}`);
      }
  });
  ws.on('message', function (context) {
      console.log(`[SERVER] Received: ${context}`);
      var messageData = {data: [JSON.parse(context)]};
      
      ws.send(JSON.stringify(messageData), (err) => {
          if (err) {
              console.log(`[SERVER] error: ${err}`);
          }
      });
  })
  ws.on("close", function (code, reason) {
		console.log("Connection closed")
	})
});