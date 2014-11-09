'use strict';

var _ = require('lodash');
var Lineup = require('./lineup.model');
var Lineupuser = require('../lineupuser/lineupuser.model');

exports.index = function (req, res) {
  if (req.user.hasRole('admin')) {
    Lineup.find({ owner: req.user._id }, function (err, lineups) {
      if (err) return handleError(res, err);
      return res.json(200, lineups);
    });
  } else if (req.user.hasRole('clerk')) {
    return res.json(501, 'Not Implemented');
  } else {
    return res.json(501, 'Not Implemented');
  }
};

exports.show = function (req, res) {
  if (req.user.hasRole('clerk')) {
    Lineup.findById(req.params.id, function (err, lineup) {
      if (err) return handleError(res, err);
      if (!lineup) return res.json(404);
      Lineupuser.find({ lineup: lineup._id }).populate('user').exec(function (err, lineupusers) {
        if (err) return handleError(res, err);
        lineup.clients = lineupusers;
        return res.json(200, lineup);
      });
    });
  } else {
    Lineup.findById(req.params.id, function (err, lineup) {
      if (err) return handleError(res, err);
      if (!lineup) return res.json(404);
      return res.json(200, lineup);
    });
  }
};

exports.create = function (req, res) {
  if (req.user.hasRole('admin')) {
    req.body.owner = req.user._id;
    Lineup.create(req.body, function (err, lineup) {
      if (err) return handleError(res, err);
      return res.json(200, lineup);
    });
  } else if (req.user.hasRole('clerk')) {
    return res.json(501, 'Not Implemented');
  } else {
    return res.json(501, 'Not Implemented');
  }
};

exports.update = function (req, res) {
  if (req.user.hasRole('admin')) {
    return res.json(501, 'Not Implemented');
  } else if (req.user.hasRole('clerk')) {
    return res.json(501, 'Not Implemented');
  } else {
    return res.json(501, 'Not Implemented');
  }
};

exports.destroy = function (req, res) {
  if (req.user.hasRole('admin')) {
    return res.json(501, 'Not Implemented');
  } else if (req.user.hasRole('clerk')) {
    return res.json(501, 'Not Implemented');
  } else {
    return res.json(501, 'Not Implemented');
  }
};

function handleError(res, err) {
  return res.json(500, err);
}
