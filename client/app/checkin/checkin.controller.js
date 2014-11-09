'use strict';

angular.module('lineupApp')
  .controller('CheckinCtrl', function ($scope, Checkin, Lineup, $routeParams) {
    $scope.lineup = Lineup.get({id: $routeParams.id});

    var refreshGuestList = function() {
    	$scope.checkin = Checkin.query();
    }

    refreshGuestList();

    $scope.addGuest = function() {
        Lineup.update({
            id: $scope.lineup._id
        }, {
            name: $scope.user.name,
            phone: $scope.user.phone
        }, function(newGuest) {
            $scope.checkin.guests.push(newGuest);
        });
    };

    $scope.checkout = function(index) {
        Lineup.checkout({
            id: $scope.lineup._id
        }, function(newGuest) {
            $scope.checkin.guests.splice(index, 1);
        });
    };

    $scope.deleteGuest = function(index){
        Lineup.noshow({
            id: $scope.lineup._id
        }, function(newGuest) {
            $scope.checkin.guests.splice(index, 1);
        });

    	$scope.checkin.guests.splice(index, 1);
    };

  });
