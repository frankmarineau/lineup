'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/guests/:id', {
        templateUrl: 'app/clientLineupDetails/clientLineupDetails.html',
        controller: 'ClientlineupdetailsCtrl'
      });
  });
