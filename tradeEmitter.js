// Set up tradeEmitter
var EventEmitter = require('events').EventEmitter;
var tradeEmitter = new EventEmitter();
var emitTrade = function(trade) {
  tradeEmitter.emit('trade', trade);
};
module.exports = tradeEmitter;

// Set up listeners
var bitstamp = require('./listeners/bitstamp');
var bitfinex = require('./listeners/bitfinex');
var hitbtc = require('./listeners/hitbtc');
var btce = require('./listeners/btce');
bitstamp.on('trade', emitTrade);
bitfinex.on('trade', emitTrade);
hitbtc.on('trade', emitTrade);
btce.on('trade', emitTrade);
