/*
* This module periodically requests trade data from Bitfinex,
* standardizes the trade data, and emits a trade event.
*/
var exchange = 'BTC-e';
var request = require('request');
var EventEmitter = require('events').EventEmitter;
var lastID = 0;
var dateNow = Date.now();
var url = 'https://btc-e.com/api/2/btc_usd/trades';
var period = 5000;
var btce = new EventEmitter();

setInterval(function() {
	request(url, function(err, res, body) {
		// Filter out old trades
		try {
			var rawTrades = JSON.parse(body).reverse().filter(function(trade) {
				return trade.tid > lastID && trade.date*1000 > dateNow;
			});
			for (var i = 0; i < rawTrades.length; i++) {
				rawTrades[i].tid > lastID && (lastID = rawTrades[i].tid);
				var trade = {
					exchange: exchange,
					date: rawTrades[i].date * 1000,
					price: rawTrades[i].price,
					amount: rawTrades[i].amount,
					currency: 'BTC',
					tCurrency: 'USD',
					exchangeTradeID: rawTrades[i].tid
				};
				btce.emit('trade', trade);
			}
		} catch (error) {
			console.error('Error retrieving btce data (probably invalid JSON): ' + error);
		}
	});
}, period);
module.exports = btce;