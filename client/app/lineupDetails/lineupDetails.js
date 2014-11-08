'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/lineupDetails', {
        templateUrl: 'app/lineupDetails/lineupDetails.html',
        controller: 'LineupdetailsCtrl'
      });
  });
