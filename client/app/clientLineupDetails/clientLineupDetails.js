'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/clientLineupDetails', {
        templateUrl: 'app/clientLineupDetails/clientLineupDetails.html',
        controller: 'ClientlineupdetailsCtrl'
      });
  });
