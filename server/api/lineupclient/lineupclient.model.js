'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupclientSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Lineupclient', LineupclientSchema);