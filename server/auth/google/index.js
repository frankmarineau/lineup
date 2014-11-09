'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', function (req, res, next) {
    passport.authenticate('google', {
      failureRedirect: '/signup',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ],
      session: false,
      state: req.query.state
    })(req, res, next);
  })

  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;
