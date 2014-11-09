'use strict';

angular.module('lineupApp')
  .service('Checkin', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return{
    	query: function(){
    		
    		var lineupName = 'Organization';

    		var fullName = function(object){

    			return object.firstName + ' ' + object.lastName;

    		};

    		var guests = [{
    			id: 12345345543,
    			name: 'Marc-Antoine',
    			phoneNumber: '819-238-1313'
    		},
    		{
    			id: 12345349943,
    			name: 'Olivier',
    			phoneNumber: '819-911'
    			
    		}];
    		return{
    			lineupName:lineupName,
    			guests:guests,
    			fullName:fullName
    		};
    	}
    }
  });
