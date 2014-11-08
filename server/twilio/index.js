'use strict';

var express = require('express');
var config = require('../config/environment');

var router = express.Router();

router.use('/sms', require('./sms'));

module.exports = router;
