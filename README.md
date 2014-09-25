TradeListener
=============

Connects with cryptocurrency markets and collects live trade data.

If you have an exchange you'd like to be added, open an issue. Or, better yet,
open a pull request!

Trade listeners should extend EventEmmiter and emit a 'trade' event when
a trade occurs. The associated data objects should look like this:

    {
      exchange: String,
      date: Date,
      price: Number,
      amount: Number,
      currency: String,
      tCurrency: String,
      exchangeTradeID: String
    }
