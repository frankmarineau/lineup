/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lineup = require('./lineup.model');

exports.register = function(socket) {
  Lineup.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lineup.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lineup:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lineup:remove', doc);
}
