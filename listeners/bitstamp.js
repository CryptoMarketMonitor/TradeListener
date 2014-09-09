// Listens for trades, standardizes them, emits trade events
var exchange = 'Bitstamp';
var EventEmitter = require('events').EventEmitter;
var bitstamp = new EventEmitter();
var Pusher = require('pusher-client');
var listener = new Pusher('de504dc5763aeef9ff52').subscribe('live_trades');
listener.bind('trade', function(rawTrade) {
	var trade = {
		exchange: exchange,
		date: Date.now(),
		price: rawTrade.price,
		amount: rawTrade.amount,
    currency: 'BTC',
    tCurrency: 'USD',
		exchangeTradeID: rawTrade.id
	};
	bitstamp.emit('trade', trade);
});

module.exports = bitstamp;