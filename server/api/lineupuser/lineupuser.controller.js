'use strict';

var _ = require('lodash');
var Lineupuser = require('./lineupuser.model');

// Get list of lineupusers
exports.index = function(req, res) {
  Lineupuser.find(function (err, lineupusers) {
    if(err) { return handleError(res, err); }
    return res.json(200, lineupusers);
  });
};

// Get a single lineupuser
exports.show = function(req, res) {
  Lineupuser.findById(req.params.id, function (err, lineupuser) {
    if(err) { return handleError(res, err); }
    if(!lineupuser) { return res.send(404); }
    return res.json(lineupuser);
  });
};

// Creates a new lineupuser in the DB.
exports.create = function(req, res) {
  Lineupuser.create(req.body, function(err, lineupuser) {
    if(err) { return handleError(res, err); }
    return res.json(201, lineupuser);
  });
};

// Updates an existing lineupuser in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Lineupuser.findById(req.params.id, function (err, lineupuser) {
    if (err) { return handleError(res, err); }
    if(!lineupuser) { return res.send(404); }
    var updated = _.merge(lineupuser, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, lineupuser);
    });
  });
};

// Deletes a lineupuser from the DB.
exports.destroy = function(req, res) {
  Lineupuser.findById(req.params.id, function (err, lineupuser) {
    if(err) { return handleError(res, err); }
    if(!lineupuser) { return res.send(404); }
    lineupuser.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}