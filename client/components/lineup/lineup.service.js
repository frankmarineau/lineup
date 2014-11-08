'use strict';

angular.module('lineupApp')
  .service('lineup', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    // return $resource('/user/:userId/card/:cardId',
    //  {userId:123, cardId:'@id'}, {
    //   charge: {method:'POST', params:{charge:true}}
    //  });

    return {
      query: function() {
        var lineups = [{
          title: 'allo',
          guests: [{
            timeJoined: moment().subtract(10, 'minutes'),
            name: "Franky Marinade",
            phone: "123 456-7890"
          }, {
            timeJoined: moment().subtract(20, 'minutes'),
            name: "Jesse Emondeur",
            phone: "450 466-1337"
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
        }]
      }
    }
  });
