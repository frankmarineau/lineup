'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/lineups/:id', {
        templateUrl: 'app/lineupDetails/lineupDetails.html',
        controller: 'LineupdetailsCtrl'
      });
  });
