'use strict';

angular.module('lineupApp')
  .service('ClientLineup', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      query: function() {
        var lineups = [{
          id: 1002938,
          message: "Welcome to my super Lineup!",
          position: 142,
          expectedWaitTime: 42
        },
        {
          id: 213239,
          message: "This should not be shown.",
          position: 12,
          expectedWaitTime: 3
        }];

        return lineups;
      }
    };
  });
