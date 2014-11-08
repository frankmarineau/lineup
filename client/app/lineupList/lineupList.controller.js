'use strict';

angular.module('lineupApp')
  .controller('LineuplistCtrl', function ($scope, Lineup) {
    var refreshLineups = function() {
        $scope.lineups = Lineup.query();
    };
    refreshLineups();
    setInterval(refreshLineups, 1000);


    if ($scope.lineups.length == 1) {
        //TODO redirect on it
    }
  });
