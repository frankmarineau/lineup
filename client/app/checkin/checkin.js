'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/checkin', {
        templateUrl: 'app/checkin/checkin.html',
        controller: 'CheckinCtrl'
      });
  });
