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
      lineupuser.noShow = !!req.query.noshow && req.query.noshow !== '0';
      lineupuser.save(function (err, lineupuser) {
        if (err) return handleError(res, err);
        if (lineupuser.noShow) {
          if (lineupuser.user && lineupuser.user.phone) {
            twilio.sendMessage(lineupuser.user.phone, 'You missed your turn. Return to the venue to reserve your place again.');
          } else if (lineupuser.phone) {
            twilio.sendMessage(lineupuser.phone, 'You missed your turn. Return to the venue to reserve your place again.');
          }
        }
        Lineupuser.find({ lineup: lineupuser.lineup, timeLeft: null }).populate('user').exec(function (err, lineupusers) {
          if (err) return;
          if (lineupusers.length >= 3) {
            lineupusers[2].userPosition(function (err, pos) {
              if (err) return;
              lineupusers[2].averageWait(function (err, wait) {
                if (err) return;
                if (lineupusers[2].user && lineupusers[2].user.phone) {
                  twilio.sendMessage(lineupusers[2].user.phone, 'You are now 3rd in line! Time to show up! Estimated wait time is ' + Math.round(pos * wait / 1000 / 60) + 'min');
                } else if (lineupusers[2].phone) {
                  twilio.sendMessage(lineupusers[2].phone, 'Your are now 3rd line! Time to show up! Estimated wait time is ' + Math.round(pos * wait / 1000 / 60) + 'min');
                }
              });
            });
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
