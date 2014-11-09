'use strict';

var config = require('../config/environment');
var twilio = require('twilio');
var googl = require('goo.gl');

var client = twilio(config.twilio.accountID, config.twilio.accountToken);

googl.setKey(config.googl.apiKey);

module.exports = {
  sendMessage: function (to, body, cb) {
    client.messages.create({
      from: config.twilio.accountNumber,
      to: to,
      body: body
    }, function (err, msg) {
      if (cb) cb(err, msg);
    });
  },

  shorten: function (url, cb) {
    googl.shorten(url).then(function (shorturl) {
      cb(null, shorturl);
    }).catch(function (err) {
      cb(err);
    });
  }
};

