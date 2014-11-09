'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/guests', {
        templateUrl: 'app/clientLineupDetails/clientLineupDetails.html',
        controller: 'ClientlineupdetailsCtrl',
        authenticate: true
      });
  });
