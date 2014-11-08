'use strict';

angular.module('lineupApp')
  .controller('LineuplistCtrl', function ($scope, Lineup) {
    $scope.lineups = Lineup.query();
    if ($scope.lineups.length == 1) {
        //TODO redirect on it
    }
    console.log($scope.lineups);
  });
