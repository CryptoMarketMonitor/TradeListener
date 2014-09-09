
var exchange = 'hitbtc';
var io = require('socket.io-client');
var EventEmitter = require('events').EventEmitter;
var hitbtc = new EventEmitter();
var listener = io.connect('https://api.hitbtc.com:8081/trades/BTCUSD');
listener.on('trade', function (data) {
  var trade = {
    exchange: exchange,
    date: Date.now(),
    price: data.price,
    amount: data.amount,
    currency: 'BTC',
    tCurrency: 'USD',
    exchangeTradeID: Date.now()
  };
  hitbtc.emit('trade', trade);
});

module.exports = hitbtc;