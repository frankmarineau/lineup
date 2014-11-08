'use strict';

var _ = require('lodash');
var Enterprise = require('./enterprise.model');

// Get list of enterprises
exports.index = function(req, res) {
  Enterprise.find(function (err, enterprises) {
    if(err) { return handleError(res, err); }
    return res.json(200, enterprises);
  });
};

// Get a single enterprise
exports.show = function(req, res) {
  Enterprise.findById(req.params.id, function (err, enterprise) {
    if(err) { return handleError(res, err); }
    if(!enterprise) { return res.send(404); }
    return res.json(enterprise);
  });
};

// Creates a new enterprise in the DB.
exports.create = function(req, res) {
  Enterprise.create(req.body, function(err, enterprise) {
    if(err) { return handleError(res, err); }
    return res.json(201, enterprise);
  });
};

// Updates an existing enterprise in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Enterprise.findById(req.params.id, function (err, enterprise) {
    if (err) { return handleError(res, err); }
    if(!enterprise) { return res.send(404); }
    var updated = _.merge(enterprise, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, enterprise);
    });
  });
};

// Deletes a enterprise from the DB.
exports.destroy = function(req, res) {
  Enterprise.findById(req.params.id, function (err, enterprise) {
    if(err) { return handleError(res, err); }
    if(!enterprise) { return res.send(404); }
    enterprise.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}