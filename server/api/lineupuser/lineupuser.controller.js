'use strict';

var _ = require('lodash');
var Lineupuser = require('./lineupuser.model');

exports.destroy = function (req, res) {
  Lineupuser.findById(req.params.id, function (err, lineupuser) {
    if (err) return handleError(res, err);
    if (!lineupuser) return res.send(404);
    lineupuser.timeLeave = Date.now();
    lineupuser.noShow = !!req.query.noshow;
    lineupuser.save(function (err, lineupuser) {
      if (err) return handleError(res, err);
      return res.json(200, lineupuser);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
