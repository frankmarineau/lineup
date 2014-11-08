'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/lineups', {
        templateUrl: 'app/lineupList/lineupList.html',
        controller: 'LineuplistCtrl',
        authenticate: true
      });
  });
