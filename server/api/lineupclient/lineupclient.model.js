'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupclientSchema = new Schema({
  lineup: { type: Schema.Types.ObjectId, ref: 'Lineup' },
  timeJoined: { type: Date, default: Date.now },
  timeLeave: Date,
  name: String,
  phone: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Lineupclient', LineupclientSchema);
