'use strict';

var express = require('express');
var twilio = require('../twilio.service');

var router = express.Router();

router.post('/', function (req, res, next) {
  console.log(req.body);
});

module.exports = router;
