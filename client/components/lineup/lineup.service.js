'use strict';

angular.module('lineupApp')
  .service('Lineup', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    // return $resource('/user/:userId/card/:cardId',
    //  {userId:123, cardId:'@id'}, {
    //   charge: {method:'POST', params:{charge:true}}
    //  });

    return {
      query: function() {
        var d = new Date();
        d.setMinutes(d.getMinutes() - 10);

        var d2 = new Date();
        d2.setMinutes(d2.getMinutes() - 20);

        var lineups = [{
          title: 'allo',
          guests: [{
            timeJoined: d,
            name: "Franky Marinade",
            phone: "1234567890"
          }, {
            timeJoined: d2,
            name: "Jesse Emondeur",
            phone: "4504661337"
          }],
          config: {
            customFields: ["Number of reservations"],
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
          },
          stats: {
            // In minutes
            averageWaitTime: 35
          }
        }];

        return lineups;
      }
    }
  });
