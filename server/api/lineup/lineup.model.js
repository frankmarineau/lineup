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
    hour: { type: Number, default: 8 },
    minute: { type: Number, default: 0 }
  },
  closing: {
    hour: { type: Number, default: 17 },
    minute: { type: Number, default: 0 }
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
  this.model('Lineupuser').find({ lineup: this._id, timeLeft: { $gte: today } }, function (err, lineupusers) {
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
      self.model('Lineupuser').count({ lineup: self._id, timeJoined: { $gte: today } }, callback);
    },
    function (callback) {
      self.model('Lineupuser').count({ lineup: self._id, timeJoined: { $gte: today }, noShow: true }, callback);
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

LineupSchema.pre('remove', function (next) {
  this.model('Lineupuser').remove({ lineup: this._id }).exec();
  next();
});

module.exports = mongoose.model('Lineup', LineupSchema);
