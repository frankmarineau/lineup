'use strict';

angular.module('lineupApp')
  .controller('ClientlineupdetailsCtrl', function ($scope, Auth, ClientLineup) {
    var lineups = ClientLineup.query();
    $scope.isInQueue = lineups.length > 0;

    var name = Auth.getCurrentUser().name;
    var words = name.split(' ');
    var firstName = words.length > 0 ? words[0] : null;
    
    $scope.firstName = firstName;

    if (lineups.length > 0) {
        $scope.lineup = lineups[0];
    }
  });
