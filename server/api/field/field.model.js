'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FieldSchema = new Schema({
  title: { type: String, required: true },
  lineup: { type: Schema.Types.ObjectId, ref: 'Lineup', required: true },
  required: { type: Boolean, default: false },
  description: String
});

module.exports = mongoose.model('Field', FieldSchema);
