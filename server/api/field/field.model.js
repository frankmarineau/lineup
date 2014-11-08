'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FieldSchema = new Schema({
  title: { type: String, required: true },
  required: { type: Boolean, default: false },
  description: String,
  lineup: { type: Schema.Types.ObjectId, ref: 'Lineup', required: true }
});

module.exports = mongoose.model('Field', FieldSchema);
