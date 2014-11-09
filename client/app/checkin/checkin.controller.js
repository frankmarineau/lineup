'use strict';

angular.module('lineupApp')
  .controller('CheckinCtrl', function ($scope, Checkin) {
    
    $scope.message = 'Hello';    

    var refreshGuestList = function(){
    	$scope.checkin = Checkin.query();
    }

    refreshGuestList();

    $scope.addGuest = function(form)
    {
    	// TO DO: implement the add
    	$scope.checkin.guests.push(guest);
    };

    $scope.checkout = function(index){
    	// TODO Checkout call

    	$scope.checkin.guests.splice(index, 1);
    };

    $scope.deleteGuest = function(index){
    	// TO DO: delete call
    	$scope.checkin.guests.splice(index, 1);
    };

  });
