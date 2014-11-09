'use strict';

angular.module('lineupApp')
  .controller('CheckinCtrl', function ($scope, Lineup, $routeParams) {
    $scope.lineup = Lineup.get({id: $routeParams.id});

    $scope.addGuest = function() {
        Lineup.update({
            id: $scope.lineup._id
        }, {
            name: $scope.user.name,
            phone: $scope.user.phone
        }, function(newGuest) {
            $scope.lineup.users.push(newGuest);
            $scope.user.name = "";
            $scope.user.phone = "";
        });
    };

    $scope.checkout = function(index) {
        Lineup.checkout({
            id: $scope.lineup.users[index]._id
        }, function(newGuest) {
            $scope.lineup.users.splice(index, 1);
        });
    };

    $scope.deleteGuest = function(index){
        Lineup.noshow({
            id: $scope.lineup.users[index]._id
        }, function(newGuest) {
            $scope.lineup.users.splice(index, 1);
        });

    	$scope.lineup.users.splice(index, 1);
    };

  });
