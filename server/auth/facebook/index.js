'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', function (req, res, next) {
    passport.authenticate('facebook', {
      scope: ['email', 'user_about_me'],
      failureRedirect: '/signup',
      session: false,
      state: req.query.state
    })(req, res, next);
  })

  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;
