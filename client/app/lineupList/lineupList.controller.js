'use strict';

angular.module('lineupApp')
  .controller('LineuplistCtrl', function ($scope, Lineup, $location, $interval) {
    var refreshLineups = function() {
        Lineup.query({}, function(lineups) {
            $scope.lineups = lineups;
        });
    };

    refreshLineups();
    var intervalPromise = $interval(refreshLineups, 3000);

    $scope.$on('$destroy',function(){
        if(intervalPromise) {
            $interval.cancel(intervalPromise);
        }
    });

    $scope.addLineup = function() {
        Lineup.save({
            title: $scope.title
        }, function(newLineup) {
            $scope.lineups.push(newLineup);
        });
    };
  });
