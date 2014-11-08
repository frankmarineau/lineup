'use strict';

var express = require('express');
var twilio = require('../twilio.service');
var User = require('../../api/user/user.model');

var router = express.Router();

router.post('/', function (req, res, next) {
  User.findOne({ phone: req.body.from }, function (err, user) {

  });
});

module.exports = router;
