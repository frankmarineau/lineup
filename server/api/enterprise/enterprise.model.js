'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EnterpriseSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  lineups: [{ type: Schema.Types.ObjectId, ref: 'Lineup' }]
});

module.exports = mongoose.model('Enterprise', EnterpriseSchema);
