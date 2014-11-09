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

module.exports = mongoose.model('Lineup', LineupSchema);
