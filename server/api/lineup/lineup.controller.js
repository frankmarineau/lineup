'use strict';

var _ = require('lodash');
var Lineup = require('./lineup.model');
var Lineupuser = require('../lineupuser/lineupuser.model');

exports.index = function(req, res) {
  if (req.user.hasRole('admin')) {
    Lineup.find({ owner: req.user._id }, function (err, lineups) {
      if (err) return handleError(res, err);
      return res.json(200, lineups);
    });
  } else if (req.user.hasRole('clerk')) {
    return res.send(501, 'Not Implemented');
  } else {
    return res.send(501, 'Not Implemented');
  }
};

exports.show = function(req, res) {
  if (req.user.hasRole('clerk')) {
    Lineup.findById(req.params.id, function (err, lineup) {
      if (err) return handleError(res, err);
      if (!lineup) return res.send(404);
      Lineupuser.find({ lineup: lineup._id }).populate('user').exec(function (err, lineupusers) {
        if (err) return handleError(res, err);
        lineup.clients = lineupusers;
        return res.json(lineup);
      });
    });
  } else {
    Lineup.findById(req.params.id, function (err, lineup) {
      if (err) return handleError(res, err);
      if (!lineup) return res.send(404);
      return res.json(lineup);
    });
  }
};

function handleError(res, err) {
  return res.send(500, err);
}
