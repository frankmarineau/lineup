'use strict';

angular.module('lineupApp')
  .controller('CheckinCtrl', function ($scope, Checkin, Lineup, $routeParams) {
    $scope.message = 'Hello';

    $scope.lineup = Lineup.get({id: $routeParams.id});

    var refreshGuestList = function(){
    	$scope.checkin = Checkin.query();
    }

    refreshGuestList();

    $scope.addGuest = function()
    {
        Lineup.update({
            id: $scope.lineup._id
        }, {
            name: $scope.user.name,
            phone: $scope.user.phone
        });

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
