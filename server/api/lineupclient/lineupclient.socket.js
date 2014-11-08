/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lineupclient = require('./lineupclient.model');

exports.register = function(socket) {
  Lineupclient.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lineupclient.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lineupclient:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lineupclient:remove', doc);
}