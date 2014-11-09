'use strict';

var _ = require('lodash');
var async = require('async');
var Lineup = require('./lineup.model');
var Lineupuser = require('../lineupuser/lineupuser.model');
var User = require('../user/user.model');
var twilio = require('../../twilio/twilio.service');

exports.index = function (req, res) {
  if (req.user.hasRole('admin')) {
    Lineup.find({ owner: req.user._id }, function (err, lineups) {
      if (err) return handleError(res, err);
      async.map(lineups, function (lineup, callback) {
        lineup.lineupStats(function (err, stats) {
          if (err) return handleError(res, err);
          stats.wait = Math.round(stats.wait / 1000 / 60);
          lineup = lineup.toObject();
          lineup.stats = stats;
          callback(err, lineup);
        });
      }, function (err, lineups) {
        if (err) return handleError(res, err);
        return res.json(200, lineups);
      });
    });
  } else if (req.user.hasRole('clerk')) {
    Lineup.find({ owner: req.user.manager }, function (err, lineups) {
      if (err) return handleError(res, err);
      async.map(lineups, function (lineup, callback) {
        lineup.lineupStats(function (err, stats) {
          if (err) return handleError(res, err);
          stats.wait = Math.round(stats.wait / 1000 / 60);
          lineup = lineup.toObject();
          lineup.stats = stats;
          callback(err, lineup);
        });
      }, function (err, lineups) {
        if (err) return handleError(res, err);
        return res.json(200, lineups);
      });
    });
  } else {
    Lineupuser.find({ user: req.user._id, timeLeft: null }).populate('lineup').exec(function (err, lineupusers) {
      if (err) return handleError(res, err);
      async.map(lineupusers, function (lineupuser, callback) {
        lineupuser.userStats(function (err, stats) {
          if (err) return handleError(res, err);
          lineupuser = lineupuser.toObject();
          stats.wait = Math.round(stats.wait / 1000 / 60);
          lineupuser.stats = stats;
          callback(err, lineupuser);
        });
      }, function (err, lineupusers) {
        if (err) return handleError(res, err);
        return res.json(200, lineupusers);
      });
    });
  }
};

exports.show = function (req, res) {
  Lineup.findById(req.params.id, function (err, lineup) {
    if (err) return handleError(res, err);
    if (!lineup) return res.send(404);

    if (req.user.hasRole('admin')) {
      Lineupuser.find({ lineup: lineup._id }).populate('user').exec(function (err, lineupusers) {
        if (err) return handleError(res, err);
        lineup.lineupStats(function (err, stats) {
          if (err) return handleError(res, err);
          stats.wait = Math.round(stats.wait / 1000 / 60);
          lineup = lineup.toObject();
          lineup.users = lineupusers;
          lineup.stats = stats;
          return res.json(200, lineup);
        });
      });
    } else if (req.user.hasRole('clerk')) {
      Lineupuser.find({ lineup: lineup._id, timeLeft: null }).populate('user').exec(function (err, lineupusers) {
        if (err) return handleError(res, err);
        lineup.lineupStats(function (err, stats) {
          if (err) return handleError(res, err);
          stats.wait = Math.round(stats.wait / 1000 / 60);
          lineup = lineup.toObject();
          lineup.users = lineupusers;
          lineup.stats = stats;
          return res.json(200, lineup);
        });
      });
    } else {
      Lineupuser.findOne({ lineup: lineup._id, user: req.user._id, timeLeft: null }, function (err, lineupuser) {
        if (err) return handleError(res, err);
        lineupuser.userStats(function (err, stats) {
          if (err) return handleError(res, err);
          stats.wait = Math.round(stats.wait / 1000 / 60);
          lineupuser = lineupuser.toObject();
          lineupuser.lineup = lineup;
          lineupuser.stats = stats;
          return res.json(200, lineupuser);
        });
      });
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
    return res.send(403);
  } else {
    return res.send(403);
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
    return res.send(403);
  } else {
    return res.send(403);
  }
};

exports.destroy = function (req, res) {
  if (req.user.hasRole('admin')) {
    Lineup.findOne({ _id: req.params.id, owner: req.user._id }, function (err, lineup) {
      if (err) return handleError(res, err);
      if (!lineup) return res.send(404);
      lineup.remove(function (err) {
        if (err) return handleError(res, err);
        return res.send(204);
      });
    });
  } else if (req.user.hasRole('clerk')) {
    return res.send(403);
  } else {
    return res.send(403);
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
          req.body.name = req.body.name || user.name;
          req.body.phone = req.body.phone || user.phone;
          Lineupuser.create(req.body, function (err, lineupuser) {
            if (err) return handleError(res, err);
            if (user.phone) {
              sendMessages(user, lineup, lineupuser, function (err, res) {
                if (err) return console.log(err);
              });
            }
            return res.json(201, lineupuser);
          });
        });
      } else if (req.body.phone) {
        User.findOne({ phone: req.body.phone }, function (err, user) {
          if (err) return handleError(res, err);
          if (user) {
            req.body.user = user._id;
            req.body.name = req.body.name || user.name;
            req.body.phone = req.body.phone || user.phone;
          }
          Lineupuser.create(req.body, function (err, lineupuser) {
            if (err) return handleError(res, err);
            sendMessages(req.body, lineup, lineupuser, function (err, res) {
              if (err) return console.log(err);
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
      Lineupuser.find({ lineup: lineup._id, user: req.user._id, timeLeft: null }, function (err, lineupuser) {
        if (err) return handleError(res, err);
        if (!lineupuser) {
          Lineupuser.create(req.body, function (err, lineupuser) {
            if (err) return handleError(res, err);
            if (req.user.phone) {
              sendMessages(req.user, lineup, lineupuser, function (err, res) {
                if (err) return console.log(err);
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

function sendMessages(user, lineup, lineupuser, cb) {
  twilio.sendMessage(user.phone, 'Welcome ' + user.name + ' to the ' + lineup.title + ' line-up.', function (err, msg) {
    if (err) return cb(err);
    lineupuser.userPosition(function (err, pos) {
      if (err) return cb(err);
      lineupuser.averageWait(function (err, wait) {
        if (err) return cb(err);
        twilio.shorten('http://beinline.co/guests/' + lineupuser._id, function (err, shorturl) {
          if (isNaN(wait)) {
            twilio.sendMessage(user.phone, 'You are ' + numberString(pos) + ' in line. Live status @ ' + shorturl, function (err, msg) {
              if (err) return cb(err);
              return cb(null, true);
            });
          } else {
            twilio.sendMessage(user.phone, 'You are ' + numberString(pos) + ' in line. Estimated wait time is ' + Math.round(pos * wait / 1000 / 60) + 'min. Live status @ ' + shorturl, function (err, msg) {
              if (err) return cb(err);
              return cb(null, true);
            });
          }
        });
      });
    });
  });
}
