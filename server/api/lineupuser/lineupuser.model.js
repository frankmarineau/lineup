'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupuserSchema = new Schema({
  lineup: { type: Schema.Types.ObjectId, ref: 'Lineup', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  phone: String,
  timeJoined: { type: Date, default: Date.now },
  timeLeave: Date,
  noShow: { type: Boolean, default: false }
});

module.exports = mongoose.model('Lineupuser', LineupuserSchema);
