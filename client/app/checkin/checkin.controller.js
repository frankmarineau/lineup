'use strict';

angular.module('lineupApp')
  .controller('CheckinCtrl', function ($scope) {
    $scope.message = 'Hello';    

    $scope.GetLineupName = function(){

    	// ajax call ??
    	return 'Emergency'
    };

    $scope.lineupName = $scope.GetLineupName();

    var Guest = function( firstName, lastName, groupSize, phoneNumer){
    	return {
    		firstName: firstName,
    		lastName: lastName,
    		groupSize: groupSize,
    		phoneNumer: phoneNumer,
    		fullName : function(){
    			return firstName + ' ' + lastName;
    		}
    	};
    };

    $scope.guests = [
    	Guest('Marc-Antoine', 'Babin', 4, '819-238-1313'),
		Guest('Olivier', 'Charbonneau', 2, '819-238-1313'),
    	];
  });
