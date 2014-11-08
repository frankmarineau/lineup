'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/lineupList', {
        templateUrl: 'app/lineupList/lineupList.html',
        controller: 'LineuplistCtrl'
      });
  });
