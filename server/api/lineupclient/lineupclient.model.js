'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupclientSchema = new Schema({
  lineup: { type: Schema.Types.ObjectId, ref: 'Lineup' },
  client: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Lineupclient', LineupclientSchema);
