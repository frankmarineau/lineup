'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
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

LineupSchema.methods.findUsers = function (cb) {
  this.model('Lineupuser').find({ lineup: this._id }).populate('user').exec(cb);
};

module.exports = mongoose.model('Lineup', LineupSchema);
