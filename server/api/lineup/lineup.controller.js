'use strict';

var _ = require('lodash');
var Lineup = require('./lineup.model');
var Lineupuser = require('../lineupuser/lineupuser.model');
var User = require('../user/user.model');
var twilio = require('../../twilio/twilio.service');

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
  Lineup.findById(req.params.id, function (err, lineup) {
    if (err) return handleError(res, err);
    if (!lineup) return res.send(404);

    if (req.user.hasRole('clerk')) {
      Lineupuser.find({ lineup: lineup._id, timeLeave: null }).populate('user').exec(function (err, lineupusers) {
        if (err) return handleError(res, err);
        console.log(lineupusers);
        lineup.averageWait(function (err, wait) {
          if (err) return handleError(res, err);
          lineup = lineup.toObject();
          lineup.clients = lineupusers;
          lineup.wait = wait;
          return res.json(200, lineup);
        });
      });
    } else {
      return res.json(200, lineup);
    }
  });
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
    Lineup.find({ _id: req.params.id, owner: req.user._id }, function (err, lineup) {
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

exports.enqueue = function (req, res) {
  Lineup.findById(req.params.id, function (err, lineup) {
    if (err) return handleError(res, err);
    if (!lineup) return res.send(404);
    req.body.lineup = lineup._id;
    if (req.user.hasRole('clerk')) {
      if (req.body.user) {
        User.findById(req.body.user, function (err, user) {
          if (err) return handleError(res, err);
          if (!user) return res.send(404);
          Lineupuser.create(req.body, function (err, lineupuser) {
            if (err) return handleError(res, err);
            if (user.phone) {
              twilio.sendMessage(req.body.phone, 'Welcome ' + user.name + ' to the ' + lineup.title + ' line-up.', function (err, msg) {
                if (err) return;
                Lineupuser.count({
                  lineup: lineup._id,
                  timeJoin: { $lte: lineupuser.timeJoin },
                  timeLeave: null
                }, function (err, count) {
                  if (err) return;
                  lineup.averageWait(function (err, wait) {
                    if (err) return;
                    twilio.sendMessage(user.phone, 'You are ' + numberString(count) + ' in line. Est. wait time is ' + Math.round(wait * count / 1000 / 60) + 'min. Live status @ http://t.co/1337');
                  });
                });
              });
            }
            return res.json(201, lineupuser);
          });
        });
      } else if (req.body.phone) {
        User.findOne({ phone: req.body.phone }, function (err, user) {
          if (err) return handleError(res, err);
          if (user) req.body.user = user._id;
          Lineupuser.create(req.body, function (err, lineupuser) {
            if (err) return handleError(res, err);
            twilio.sendMessage(req.body.phone, 'Welcome ' + req.body.name + ' to the ' + lineup.title + ' line-up.', function (err, msg) {
              if (err) return;
              Lineupuser.count({
                lineup: lineup._id,
                timeJoin: { $lte: lineupuser.timeJoin },
                timeLeave: null
              }, function (err, count) {
                if (err) return;
                lineup.averageWait(function (err, wait) {
                  if (err) return;
                  twilio.sendMessage(req.body.phone, 'You are ' + numberString(count) + ' in line. Est. wait time is ' + Math.round(wait * count / 1000 / 60) + 'min. Live status @ http://t.co/1337');
                });
              });
            });
            return res.json(201, lineupuser);
          });
        });
      } else {
        Lineupuser.create(req.body, function (err, lineupuser) {
          if (err) return handleError(res, err);
          return res.json(201, lineupuser);
        });
      }
    } else {
      req.body.user = req.user._id;
      Lineupuser.find({ lineup: lineup._id, user: req.user._id, timeLeave: null }, function (err, lineupuser) {
        if (err) return handleError(res, err);
        if (!lineupuser) {
          Lineupuser.create(req.body, function (err, lineupuser) {
            if (err) return handleError(res, err);
            if (req.user.phone) {
              twilio.sendMessage(req.user.phone, 'Welcome ' + req.user.name + ' to the ' + lineup.title + ' line-up.', function (err, msg) {
                if (err) return;
                Lineupuser.count({
                  lineup: lineup._id,
                  timeJoin: { $lte: lineupuser.timeJoin },
                  timeLeave: null
                }, function (err, count) {
                  if (err) return;
                  lineup.averageWait(function (err, wait) {
                    if (err) return;
                    twilio.sendMessage(req.user.phone, 'You are ' + numberString(count) + ' in line. Est. wait time is ' + Math.round(wait * count / 1000 / 60) + 'min. Live status @ http://t.co/1337');
                  });
                });
              });
            }
            return res.json(201, lineupuser);
          });
        } else {
          return res.send(403);
        }
      });
    }
  });
}

function handleError(res, err) {
  return res.json(500, err);
}

function numberString(n) {
  var m = n % 10;
  var s = 'th';
  if (m === 1) s = 'st';
  else if (m === 2) s = 'nd';
  else if (m === 3) s = 'rd';
  return n.toString() + s;
}
