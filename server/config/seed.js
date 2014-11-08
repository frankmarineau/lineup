/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Lineup = require('../api/lineup/lineup.model');
var User = require('../api/user/user.model');

Lineup.find({}).remove(function () {

});

User.find({}).remove(function () {
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@lineup.com',
    password: 'admin'
  }, {
    provider: 'local',
    role: 'clerk',
    name: 'Hostess',
    email: 'hostess@lineup.com',
    password: 'hostess'
  }, {
    provider: 'local',
    role: 'user',
    name: 'Bob',
    phone: '1231231234',
    email: 'user@loneup.com',
    password: 'user'
  }, function() {
      console.log('finished populating users');
    }
  );
});
