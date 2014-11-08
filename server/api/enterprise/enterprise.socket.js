/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Enterprise = require('./enterprise.model');

exports.register = function(socket) {
  Enterprise.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Enterprise.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('enterprise:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('enterprise:remove', doc);
}