'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/checkins/:id', {
        templateUrl: 'app/checkin/checkin.html',
        controller: 'CheckinCtrl',
        authenticate: true
      });
  });
