'use strict';

angular.module('lineupApp')
  .controller('ClientlineupdetailsCtrl', function ($scope, Auth, Lineup, $interval) {

    var refreshLineups = function() {
        Lineup.query({}, function(lineups) {
            $scope.lineup = lineups[0] || [];
            $scope.isInQueue = lineups.length > 0;
        });
    };

    refreshLineups();
    var intervalPromise = $interval(refreshLineups, 3000);

    $scope.$on('$destroy', function() {
        if (intervalPromise) {
            $interval.cancel(intervalPromise);
        }
    });

    var user = Auth.getCurrentUser();
    var name = user.name;
    var words = name.split(' ');
    var firstName = words.length > 0 ? words[0] : null;

    $scope.firstName = firstName;
  });
