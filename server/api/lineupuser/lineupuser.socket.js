/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lineupuser = require('./lineupuser.model');

exports.register = function(socket) {
  Lineupuser.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lineupuser.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lineupuser:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lineupuser:remove', doc);
}