'use strict';

var async = require('async');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  welcomeMessage: String,
  maxInQueue: { type: Number, default: 0 },
  opening: {
    hour: Number,
    minute: Number
  },
  closing: {
    hour: Number,
    minute: Number
  },
  active: { type: Boolean, default: true }
});

LineupSchema.methods.userCount = function (cb) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  this.model('Lineupuser').count({ lineup: this._id, timeJoined: { $gte: today }, timeLeft: null }, cb);
};

LineupSchema.methods.averageWait = function (cb) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  this.model('Lineupuser').find({ lineup: this._id, timeJoined: { $gte: today }, timeLeft: { $exists: true } }, function (err, lineupusers) {
    if (err) return cb(err);
    var n = 0;
    lineupusers.forEach(function (lineupuser) {
      n += lineupuser.timeLeft - lineupuser.timeJoined;
    });
    cb(err, n / lineupusers.length);
  });
};

LineupSchema.methods.lineupStats = function (cb) {
  var self = this;
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  async.parallel([
    function (callback) {
      self.userCount(callback);
    },
    function (callback) {
      self.averageWait(callback);
    },
    function (callback) {
      self.model('Lineupuser').count({ timeJoined: { $gte: today } }, callback);
    },
    function (callback) {
      self.model('Lineupuser').count({ timeJoined: { $gte: today }, noShow: true }, callback);
    }
  ], function (err, results) {
    if (err) return cb(err);
    cb(null, {
      count: results[0],
      wait: results[1],
      total: results[2],
      noshow: results[3]
    });
  });
};

module.exports = mongoose.model('Lineup', LineupSchema);
