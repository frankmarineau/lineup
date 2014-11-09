'use strict';

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
    minute: Number,
  },
  active: { type: Boolean, default: true }
});

LineupSchema.methods.userCount = function (cb) {
  this.model('Lineupuser').count({ lineup: this._id, timeLeft: null }, cb);
};

LineupSchema.methods.noshowCount = function (cb) {
  this.model('Lineupuser').count({ lineup: this._id, noShow: true }, cb);
}

LineupSchema.methods.averageWait = function (cb) {
  this.model('Lineupuser').find({ lineup: this._id, timeLeft: { $gt: 0 } }, function (err, lineupusers) {
    if (err) return cb(err, lineupusers);
    var n = 0;
    lineupusers.forEach(function (lineupuser) {
      n += lineupuser.timeJoin - lineupuser.timeLeft;
    });
    cb(err, n / lineupusers.length);
  });
};

LineupSchema.methods.lineupStats = function (cb) {
  var self = this;
  var stats = { count: 0, noshow: 0, wait: 0 }
  this.userCount(function (err, count) {
    if (err) return cb(err, stats);
    stats.count = count;
    self.noshowCount(function (err, noshow) {
      if (err) return cb(err, stats);
      stats.noshow = noshow;
      self.averageWait(function (err, wait) {
        if (err) return cb(err, stats);
        stats.wait = wait;
        return cb(err, stats);
      });
    });
  });
};

module.exports = mongoose.model('Lineup', LineupSchema);
