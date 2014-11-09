'use strict';

var express = require('express');
var controller = require('./lineupuser.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
