'use strict';

var config = require('../config/environment');
var twilio = require('twilio');

var client = twilio(config.twilio.accountID, config.twilio.accountToken);

module.exports = {
  sendMessage: function (to, body, cb) {
    client.messages.create({
      from: config.twilio.accountNumber,
      to: to,
      body: body
    }, function (err, msg) {
      if (cb) cb(err, msg);
    });
  }
};
