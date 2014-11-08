'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineupSchema = new Schema({
  name: String,
  active: Boolean
});

module.exports = mongoose.model('Lineup', LineupSchema);
