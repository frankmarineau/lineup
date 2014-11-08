'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/clientLineup', {
        templateUrl: 'app/clientLineup/clientLineup.html',
        controller: 'ClientlineupCtrl'
      });
  });
