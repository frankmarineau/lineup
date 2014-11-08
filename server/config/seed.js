/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Lineup = require('../api/lineup/lineup.model');
var Lineupclient = require('../api/lineupclient/lineupclient.model');
var User = require('../api/user/user.model');

User.find({}).remove(function () {
  User.create({
    provider: 'local',
    role: 'clerk',
    name: 'Hostess',
    email: 'hostess@lineup.com',
    password: 'hostess'
  }, function () {
    console.log('finished populating hostesses');
  });

  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@lineup.com',
    password: 'admin'
  }, function (err, admin) {
    console.log('finished populating admin');

    Lineup.find({}).remove(function () {
      Lineup.create({
        title: 'Bedroom',
        owner: admin._id,
        config: {
          maxPeopleInQueue: 15,
          hours: {
            open: {
              hour: 7,
              minute: 0
            },
            close: {
              hour: 22,
              minute: 0
            }
          }
        }
      }, function (err, lineup) {
        console.log('finished populating lineups');

        User.create({
          provider: 'local',
          role: 'user',
          name: 'Bob',
          phone: '1231231234',
          email: 'user@lineup.com',
          password: 'user'
        }, function (err, user) {
          console.log('finished populating users');

          Lineupclient.find({}).remove(function () {
            Lineupclient.create({
              lineup: lineup._id,
              name: 'Franky Marinade',
              phone: '1234567890'
            }, {
              lineup: lineup._id,
              name: 'Jesse Emondeur',
              phone: '4504661337'
            }, {
              lineup: lineup._id,
              user: user._id
            }, function () {
              console.log('finished populating lineupclients');
            });
          });
        });
      });
    });
  });
});
