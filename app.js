
// Set up server
var port = process.env.PORT || 3000;
var server = require('http').Server();
var io = require('socket.io')(server);
server.listen(port, function() {
  console.log('listening on port', port);
});

// Application modules
var tradeEmitter = require('./tradeEmitter');
var mongo = require('./mongo');

var handleTrade = function(trade) {
  mongo.saveTrade(trade);
  io.emit('trade', trade);
};

tradeEmitter.on('trade', handleTrade);
