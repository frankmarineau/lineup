'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupSchema = new Schema({
  title: { type: String, required: true },
  enterprise: { type: Schema.Types.ObjectId, ref: 'Enterprise' },
  config: {
    customFields: [{ type: Schema.Types.ObjectId, ref: 'Field' }],
    maxPeopleInQueue: Number,
    hours: {
      open: {
        hour: Number,
        minute: Number
      },
      close: {
        hour: Number,
        minute: Number
      }
    },
    active: Boolean
  }
});

module.exports = mongoose.model('Lineup', LineupSchema);
