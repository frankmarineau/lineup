'use strict';

var _ = require('lodash');
var Lineupclient = require('./lineupclient.model');

// Get list of lineupclients
exports.index = function(req, res) {
  Lineupclient.find(function (err, lineupclients) {
    if(err) { return handleError(res, err); }
    return res.json(200, lineupclients);
  });
};

// Get a single lineupclient
exports.show = function(req, res) {
  Lineupclient.findById(req.params.id, function (err, lineupclient) {
    if(err) { return handleError(res, err); }
    if(!lineupclient) { return res.send(404); }
    return res.json(lineupclient);
  });
};

// Creates a new lineupclient in the DB.
exports.create = function(req, res) {
  Lineupclient.create(req.body, function(err, lineupclient) {
    if(err) { return handleError(res, err); }
    return res.json(201, lineupclient);
  });
};

// Updates an existing lineupclient in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Lineupclient.findById(req.params.id, function (err, lineupclient) {
    if (err) { return handleError(res, err); }
    if(!lineupclient) { return res.send(404); }
    var updated = _.merge(lineupclient, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, lineupclient);
    });
  });
};

// Deletes a lineupclient from the DB.
exports.destroy = function(req, res) {
  Lineupclient.findById(req.params.id, function (err, lineupclient) {
    if(err) { return handleError(res, err); }
    if(!lineupclient) { return res.send(404); }
    lineupclient.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}