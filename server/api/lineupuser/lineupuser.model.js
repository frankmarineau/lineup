'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupuserSchema = new Schema({
  lineup: { type: Schema.Types.ObjectId, ref: 'Lineup', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  phone: String,
  timeJoined: { type: Date, default: Date.now },
  timeLeft: Date,
  noShow: { type: Boolean, default: false }
});


LineupuserSchema.methods.userCount = function (cb) {
  this.model('Lineupuser').count({ lineup: this.lineup, timeLeft: null }, cb);
};

LineupuserSchema.methods.userPosition = function (cb) {
  this.model('Lineupuser').count({ lineup: this.lineup, timeJoined: { $lt: this.timeJoined }, timeLeft: null }, cb);
};

LineupuserSchema.methods.averageWait = function (cb) {
  this.model('Lineupuser').find({ lineup: this.lineup, timeLeft: { $gt: 0 } }, function (err, lineupusers) {
    if (err) return cb(err, lineupusers);
    var n = 0;
    lineupusers.forEach(function (lineupuser) {
      n += lineupuser.timeJoined - lineupuser.timeLeft;
    });
    cb(err, n / lineupusers.length);
  });
};

LineupuserSchema.methods.estimatedWait = function (cb) {
  var self = this;
  this.averageWait(function (err, wait) {
    if (err) return cb(err, 0);
    self.userPosition(function (err, pos) {
      if (err) return cb(err, 0);
      return cb(err, pos * wait);
    });
  });
};

LineupuserSchema.methods.userStats = function (cb) {
  var self = this;
  var stats = { count: 0, pos: 0, wait: 0 };
  this.userCount(function (err, count) {
    if (err) return cb(err, stats);
    stats.count = count;
    self.userPosition(function (err, pos) {
      if (err) return cb(err, stats);
      stats.pos = pos;
      self.averageWait(function (err, wait) {
        if (err) return cb(err, stats);
        stats.wait = pos * wait;
        return cb(err, stats);
      });
    });
  });
};

module.exports = mongoose.model('Lineupuser', LineupuserSchema);
