'use strict';

angular.module('lineupApp')
  .controller('LineuplistCtrl', function ($scope, Lineup) {
    var refreshLineups = function() {
        $scope.lineups = Lineup.query();
    };
    refreshLineups();
    //setInterval(refreshLineups, 10000);

    if ($scope.lineups.length == 1) {
        //TODO redirect on it
    }

    $scope.addLineup = function() {
        $scope.lineups.push({
            title: $scope.title,
            guests: []
        });

        Lineup.save({
            title: $scope.title
        }, function(data) {
            $scope.title = "";
        });
    };
  });
