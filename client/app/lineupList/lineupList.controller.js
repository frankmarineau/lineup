'use strict';

angular.module('lineupApp')
  .controller('LineuplistCtrl', function ($scope, Lineup, $location, $interval, Auth) {

    $scope.isAdmin = function() {
        return Auth.isAdmin();
    };

    var refreshLineups = function() {
        Lineup.query({}, function(lineups) {
            $scope.lineups = lineups;
        });
    };

    refreshLineups();
    var intervalPromise = $interval(refreshLineups, 3000);

    $scope.$on('$destroy',function() {
        if (intervalPromise) {
            $interval.cancel(intervalPromise);
        }
    });

    $scope.addLineup = function() {
        if ($scope.title.trim().length === 0) return;

        Lineup.save({
            title: $scope.title
        }, function(newLineup) {
            $scope.lineups.push(newLineup);
            $scope.title = "";
        });
    };

    $scope.lineupHref = function(id) {
        return (Auth.isAdmin() ? '/lineups'  : '/checkins') + "/" + id;
    };
  });
