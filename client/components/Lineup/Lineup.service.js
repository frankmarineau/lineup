'use strict';

angular.module('lineupApp')
  .service('Lineup', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('/api/lineups/:id', {
      id: '@id'
    }, {
      update: {
        method:'PUT'
      },
      get: {
        method: 'GET',
        isArray: false
      },
      checkout: {
        url: '/api/lineupusers/:id?noshow=0',
        method: 'DELETE'
      },
      noshow: {
        url: '/api/lineupusers/:id?noshow=1',
        method: 'DELETE'
      }
    });

    // return {
    //   query: function() {
    //     var d = new Date();
    //     d.setMinutes(d.getMinutes() - 10);

    //     var d2 = new Date();
    //     d2.setMinutes(d2.getMinutes() - 20);

    //     var lineups = [{
    //       id: 1002938,
    //       title: 'allo',
    //       guests: [{
    //         timeJoined: d,
    //         name: "Franky Marinade",
    //         phone: "1234567890"
    //       }, {
    //         timeJoined: d2,
    //         name: "Jesse Emondeur",
    //         phone: "4504661337"
    //       }],
    //       config: {
    //         customFields: ["Number of reservations"],
    //         maxPeopleInQueue: 15,
    //         hours: {
    //           open: {
    //             hour: 7,
    //             minute: 0
    //           },
    //           close: {
    //             hour: 22,
    //             minute: 0
    //           }
    //         }
    //       },
    //       stats: {
    //         // In minutes
    //         averageWaitTime: 35,
    //         averagePeopleInLine: 40,
    //         averageNoShows: 2
    //       }
    //     },
    //     {
    //       id: 20923,
    //       title: 'test',
    //       guests: [{
    //         timeJoined: d2,
    //         name: "Willy Baleine",
    //         phone: "4504661338"
    //       }],
    //       config: {
    //         customFields: ["People"],
    //         maxPeopleInQueue: 30,
    //         hours: {
    //           open: {
    //             hour: 8,
    //             minute: 30
    //           },
    //           close: {
    //             hour: 21,
    //             minute: 0
    //           }
    //         }
    //       },
    //       stats: {
    //         // In minutes
    //         averageWaitTime: 5,
    //         averagePeopleInLine: 10,
    //         averageNoShows: 1
    //       }
    //     },
    //     {
    //       id: 41902,
    //       title: '#yolo',
    //       guests: [],
    //       config: {
    //         customFields: ["Max swag"],
    //         maxPeopleInQueue: 42,
    //         hours: {
    //           open: {
    //             hour: 1,
    //             minute: 0
    //           },
    //           close: {
    //             hour: 23,
    //             minute: 0
    //           }
    //         }
    //       },
    //       stats: {
    //         // In minutes
    //         averageWaitTime: 9001,
    //         averagePeopleInLine: 4000,
    //         averageNoShows: 42
    //       }
    //     }];

    //     return lineups;
    //   },
    //   get: function(id) {
    //     return {
    //       title: 'allo',
    //       guests: [{
    //         timeJoined: d,
    //         name: "Franky Marinade",
    //         phone: "1234567890"
    //       }, {
    //         timeJoined: d2,
    //         name: "Jesse Emondeur",
    //         phone: "4504661337"
    //       }],
    //       config: {
    //         customFields: ["Number of reservations"],
    //         maxPeopleInQueue: 15,
    //         hours: {
    //           open: {
    //             hour: 7,
    //             minute: 0
    //           },
    //           close: {
    //             hour: 22,
    //             minute: 0
    //           }
    //         }
    //       },
    //       stats: {
    //         // In minutes
    //         averageWaitTime: 35
    //       }
    //     };
    //   }
    // }
  });
