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
    Lineup.find({ owner: req.user.manager }, function (err, lineups) {
      if (err) return handleError(res, err);
      return res.json(200, lineups);
    });
  } else {
    Lineupuser.find({ user: req.user._id, timeLeave: null }).populate('lineup').exec(function (err, lineupusers) {
      if (err) return handleError(res, err);
      return res.json(200, lineupusers);
    });
  }
};

exports.show = function (req, res) {
  if (req.user.hasRole('clerk')) {
    Lineup.findById(req.params.id, function (err, lineup) {
      if (err) return handleError(res, err);
      if (!lineup) return res.send(404);
      Lineupuser.find({ lineup: lineup._id }).populate('user').exec(function (err, lineupusers) {
        if (err) return handleError(res, err);
        lineup.clients = lineupusers;
        return res.json(200, lineup);
      });
    });
  } else {
    Lineup.findById(req.params.id, function (err, lineup) {
      if (err) return handleError(res, err);
      if (!lineup) return res.send(404);
      return res.json(200, lineup);
    });
  }
};

exports.create = function (req, res) {
  if (req.user.hasRole('admin')) {
    req.body.owner = req.user._id;
    Lineup.create(req.body, function (err, lineup) {
      if (err) return handleError(res, err);
      return res.json(201, lineup);
    });
  } else if (req.user.hasRole('clerk')) {
    return res.send(501, 'Not Implemented');
  } else {
    return res.send(501, 'Not Implemented');
  }
};

exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.owner) { delete req.body.owner; }

  if (req.user.hasRole('admin')) {
    Lineup.findById(req.params.id, function (err, lineup) {
      if (err) return handleError(res, err);
      if (!lineup) return res.send(404);
      var updated = _.merge(lineup, req.body);
      updated.save(function (err) {
        if (err) return handleError(res, err);
        return res.json(200, updated);
      });
    });
  } else if (req.user.hasRole('clerk')) {
    return res.send(501, 'Not Implemented');
  } else {
    return res.send(501, 'Not Implemented');
  }
};

exports.destroy = function (req, res) {
  if (req.user.hasRole('admin')) {
    Lineup.findById(req.params.id, function (err, lineup) {
      if (err) return handleError(res, err);
      if (!lineup) return res.send(404);
      lineup.remove(function (err) {
        if (err) return handleError(res, err);
        return res.send(204);
      });
    });
  } else if (req.user.hasRole('clerk')) {
    return res.send(501, 'Not Implemented');
  } else {
    return res.send(501, 'Not Implemented');
  }
};

function handleError(res, err) {
  return res.json(500, err);
}
