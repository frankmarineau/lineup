'use strict';

angular.module('lineupApp')
  .controller('LineuplistCtrl', function ($scope, Lineup, $location) {
    var refreshLineups = function() {
        $scope.lineups = Lineup.query();
    };
    refreshLineups();
    setInterval(refreshLineups, 3000);

    if ($scope.lineups.length == 1) {
        $location.path('lineups/' + $scope.lineups[0]._id);
    }

    $scope.addLineup = function() {
        Lineup.save({
            title: $scope.title
        }, function(newLineup) {
            $scope.lineups.push(newLineup);
        });
    };
  });
