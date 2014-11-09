'use strict';

angular.module('lineupApp')
  .controller('CheckinCtrl', function ($scope, Checkin) {
    
    $scope.message = 'Hello';    

    var refreshGuestList = function(){
    	$scope.checkin = Checkin.query();
    }

    refreshGuestList();

    $scope.AddGuest = function(form)
    {
    	$scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          firstName: $scope.firstName,
          lastName: $scope.lastName,
          phoneNumber: $scope.phoneNumber
        })
        .then( function(guest) {
          $scope.checkin.guests.push(guest);
        })
        .catch( function(err) {
          $scope.errors = err.message;
        });
      }
    };

    $scope.login = function(form) {
      
    };

    $scope.Checkout = function(index){
    	// ajax call for Checkout
    	$scope.checkin.guests.splice(index, 1);
    };

    $scope.DeleteGuest = function(index){
    	// ajax call for delete
    	$scope.checkin.guests.splice(index, 1);
    };

  });
