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

LineupSchema.methods.averageWait = function (cb) {
  this.model('Lineupuser').find({ lineup: this._id, timeLeave: { $gt: 0 } }, function (err, lineupusers) {
    if (err) return cb(err, lineupusers);
    var n = 0;
    lineupusers.forEach(function (lineupuser) {
      n += lineupuser.timeJoin - lineupuser.timeLeave;
    });
    cb(err, n / lineupusers.length);
  });
};

module.exports = mongoose.model('Lineup', LineupSchema);
