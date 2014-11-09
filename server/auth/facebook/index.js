'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var Lineupuser = require('../../api/lineupuser/lineupuser.model');

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
  }), auth.setTokenCookie, function (req, res, next) {
    if (req.query.state && req.user && req.user._id) {
      Lineupuser.findById(req.query.state, function (err, lineupuser) {
        if (err) return next(err);
        if (lineupuser) {
          lineupuser.user = req.user._id;
          lineupuser.save(function (err, lineupuser) {
            return next(err);
          });
        }
      });
    } else {
      return next();
    }
  });

module.exports = router;
