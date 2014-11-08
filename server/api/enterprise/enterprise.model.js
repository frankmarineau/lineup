'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EnterpriseSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

EnterpriseSchema.methods.findLineups = function (cb) {
  return this.model('Lineup').find({ enterprise: this._id }, cb);
};

module.exports = mongoose.model('Enterprise', EnterpriseSchema);
