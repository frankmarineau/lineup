/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/fields', require('./api/field'));
  app.use('/api/lineups', require('./api/lineup'));
  app.use('/api/lineupusers', require('./api/lineupuser'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  app.use('/twilio', require('./twilio'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
