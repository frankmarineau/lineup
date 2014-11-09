'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupuserSchema = new Schema({
  lineup: { type: Schema.Types.ObjectId, ref: 'Lineup' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  timeJoined: { type: Date, default: Date.now },
  timeLeave: Date
});

module.exports = mongoose.model('Lineupuser', LineupuserSchema);
