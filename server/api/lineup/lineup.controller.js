'use strict';

var _ = require('lodash');
var Lineup = require('./lineup.model');

// Get list of lineups
exports.index = function(req, res) {
  Lineup.find(function (err, lineups) {
    if(err) { return handleError(res, err); }
    return res.json(200, lineups);
  });
};

// Get a single lineup
exports.show = function(req, res) {
  Lineup.findById(req.params.id, function (err, lineup) {
    if(err) { return handleError(res, err); }
    if(!lineup) { return res.send(404); }
    return res.json(lineup);
  });
};

// Creates a new lineup in the DB.
exports.create = function(req, res) {
  Lineup.create(req.body, function(err, lineup) {
    if(err) { return handleError(res, err); }
    return res.json(201, lineup);
  });
};

// Updates an existing lineup in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Lineup.findById(req.params.id, function (err, lineup) {
    if (err) { return handleError(res, err); }
    if(!lineup) { return res.send(404); }
    var updated = _.merge(lineup, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, lineup);
    });
  });
};

// Deletes a lineup from the DB.
exports.destroy = function(req, res) {
  Lineup.findById(req.params.id, function (err, lineup) {
    if(err) { return handleError(res, err); }
    if(!lineup) { return res.send(404); }
    lineup.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}