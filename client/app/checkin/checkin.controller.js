'use strict';

angular.module('lineupApp')
  .controller('CheckinCtrl', function ($scope, Checkin) {
    
    $scope.message = 'Hello';    

    var refreshGuestList = function(){
    	$scope.checkin = Checkin.query();
    }

    refreshGuestList();

    $scope.DeleteGuest = function(index){
    	$scope.checkin.guests.splice(index, 1);
    };

  });
