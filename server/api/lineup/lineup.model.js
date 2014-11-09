'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupSchema = new Schema({
  title: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  maxInQueue: Number,
  openingHour: Number,
  closingHour: Number,
  welcomeMessage: String,
  active: Boolean
});

module.exports = mongoose.model('Lineup', LineupSchema);
