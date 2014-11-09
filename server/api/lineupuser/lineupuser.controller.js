'use strict';

var _ = require('lodash');
var Lineupuser = require('./lineupuser.model');
var twilio = require('../../twilio/twilio.service');

exports.destroy = function (req, res) {
  if (req.user.hasRole('clerk')) {
    Lineupuser.findById(req.params.id, function (err, lineupuser) {
      if (err) return handleError(res, err);
      if (!lineupuser) return res.send(404);
      lineupuser.timeLeft = Date.now();
      lineupuser.noShow = !!req.query.noshow;
      lineupuser.save(function (err, lineupuser) {
        if (err) return handleError(res, err);
        Lineupuser.find({ lineup: lineupuser.lineup, timeLeft: null }).populate('user').exec(function (err, lineupusers) {
          if (err) return;
          if (lineupusers.length >= 3 && lineupusers[2].user && lineupusers[2].user.phone) {
            twilio.sendMessage(lineupusers[2].user.phone, 'You are now 3rd in line! Time to show up!');
          }
        });
        return res.json(200, lineupuser);
      });
    });
  }
};

function handleError(res, err) {
  return res.send(500, err);
}
