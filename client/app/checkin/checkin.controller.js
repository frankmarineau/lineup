'use strict';

angular.module('lineupApp')
  .controller('CheckinCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.LineupName = function(){

    	// ajax call ??
    	var lineupName = "Emergency"
    	return lineupName;

    };
  });
