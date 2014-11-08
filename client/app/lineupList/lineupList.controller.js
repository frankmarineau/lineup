'use strict';

angular.module('lineupApp')
  .controller('LineuplistCtrl', function ($scope, Lineup) {
    $scope.lineups = Lineup.query();
    console.log($scope.lineups);
  });
